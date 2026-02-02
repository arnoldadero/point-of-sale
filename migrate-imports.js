const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            migrateFile(fullPath);
        }
    }
}

function migrateFile(filePath) {
    if (filePath.endsWith('withRouterCompat.js')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // MUI Imports - ensure we use @mui/material for everything that was in material-ui
    content = content.replace(/from "material-ui\/styles"/g, 'from "@mui/material/styles"');
    content = content.replace(/from "material-ui"/g, 'from "@mui/material"');

    // Core relocation: Redirection of withStyles and createStyles to @mui/styles
    content = content.replace(/import\s+\{([^}]*(withStyles|createStyles)[^}]*)\}\s+from\s+["']@mui\/material(\/styles)?["'];?/g, (match, p1, p2, p3) => {
        const items = p1.split(',').map(s => s.trim());
        const legacyItems = items.filter(i => i === 'withStyles' || i === 'createStyles');
        const modernItems = items.filter(i => i !== 'withStyles' && i !== 'createStyles' && i !== '');

        let res = '';
        if (legacyItems.length > 0) {
            res += `import { ${legacyItems.join(', ')} } from "@mui/styles";\n`;
        }
        if (modernItems.length > 0) {
            // Keep modern items in styles if they were there, otherwise material root
            const fromPath = p3 ? "@mui/material/styles" : "@mui/material";
            res += `import { ${modernItems.join(', ')} } from "${fromPath}";`;
        }
        return res.trim();
    });

    // Fix specific broken deep imports
    content = content.replace(/from "@mui\/material\/Progress"/g, 'from "@mui/material"');
    content = content.replace(/from "@mui\/material\/List\/ListSubheader"/g, 'from "@mui/material/ListSubheader"');
    content = content.replace(/from "@mui\/material\/Table\/TableCell"/g, 'from "@mui/material/TableCell"');
    content = content.replace(/from "@mui\/material\/Table\/TableBody"/g, 'from "@mui/material/TableBody"');
    content = content.replace(/from "@mui\/material\/Table\/TableFooter"/g, 'from "@mui/material/TableFooter"');
    content = content.replace(/from "@mui\/material\/Table\/TableHead"/g, 'from "@mui/material/TableHead"');
    content = content.replace(/from "@mui\/material\/Table\/TableRow"/g, 'from "@mui/material/TableRow"');
    content = content.replace(/from "@mui\/material\/Input"/g, 'from "@mui/material"');

    // Transitions
    content = content.replace(/from "@mui\/material\/transitions\/Slide"/g, 'from "@mui/material/Slide"');
    content = content.replace(/from "@mui\/material\/transitions\/Fade"/g, 'from "@mui/material/Fade"');
    content = content.replace(/from "@mui\/material\/transitions\/Grow"/g, 'from "@mui/material/Grow"');
    content = content.replace(/from "@mui\/material\/transitions\/Zoom"/g, 'from "@mui/material/Zoom"');

    // Convert hybrid default + named to all named
    content = content.replace(/import\s+(\w+),\s*\{([^}]+)\}\s*from\s*["']@mui\/material["'];?/g, (match, p1, p2) => {
        return `import { ${p1}, ${p2} } from "@mui/material";`;
    });

    // Convert pure default to named (ONLY when importing from the main entry point to avoid breakage)
    content = content.replace(/import\s+(\w+)\s*from\s*["']@mui\/material["'];?/g, (match, p1) => {
        return `import { ${p1} } from "@mui/material";`;
    });

    // Greedy icon replacement
    content = content.replace(/from "@material-ui\/icons/g, 'from "@mui/icons-material');
    content = content.replace(/from "material-ui-icons/g, 'from "@mui/icons-material');
    content = content.replace(/from "material-ui\//g, 'from "@mui/material/');

    // Spacing unit fix
    content = content.replace(/theme\.spacing\.unit\s*\*\s*(\d+(\.\d*)?)/g, 'theme.spacing($1)');
    content = content.replace(/theme\.spacing\((\d+)\)\.(\d+)/g, 'theme.spacing($1.$2)');
    content = content.replace(/theme\.spacing\.unit/g, 'theme.spacing(1)');

    // React Router Imports
    content = content.replace(/from "react-router"/g, 'from "react-router-dom"');

    // Specific withRouter fix
    if (content.includes('withRouter')) {
        content = content.replace(/import\s+{\s*withRouter\s*}\s*from\s*["'].*withRouterCompat(\.js)?["'];?\s*\n?/g, '');
        const importLine = 'import { withRouter } from "/src/withRouterCompat";\n';
        if (!content.includes('/src/withRouterCompat')) {
            content = importLine + content.replace(/import {[^}]*withRouter[^}]*} from "react-router-dom";/g, (match) => {
                const cleaned = match.replace('withRouter', '').replace(/,\s*,/g, ',').replace(/{\s*,/g, '{').replace(/,\s*}/g, '}');
                return (cleaned.includes('{}') || cleaned.includes('{ }')) ? '' : cleaned;
            });
            content = content.replace(/import {[^}]*withRouter[^}]*} from "react-router";/g, '');
        }
    }

    // Vite Environment Variables
    content = content.replace(/process\.env\.REACT_APP_/g, 'import.meta.env.VITE_');
    content = content.replace(/process\.env\.NODE_ENV/g, 'import.meta.env.MODE');

    // Third party CSS fixes
    content = content.replace(/import "react-select\/dist\/react-select\.css";/g, '// import "react-select/dist/react-select.css"; // MUI v6 / react-select v2+ handle this differently');

    if (content !== original) {
        console.log(`Migrated: ${filePath}`);
        fs.writeFileSync(filePath, content);
    }
}

walk(rootDir);
