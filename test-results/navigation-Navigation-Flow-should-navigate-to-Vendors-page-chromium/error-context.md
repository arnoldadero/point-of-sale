# Page snapshot

```yaml
- generic [ref=e6]:
  - generic [ref=e7]: Welcome to Easy POS
  - generic [ref=e8]: process is not defined
  - generic [ref=e9]:
    - generic [ref=e10]: Username
    - generic [ref=e11]:
      - textbox "Username" [active] [ref=e12]
      - group:
        - generic: Username
  - generic [ref=e13]:
    - generic: Password
    - generic [ref=e14]:
      - textbox "Password" [ref=e15]
      - group:
        - generic: Password
  - button "Login" [ref=e17] [cursor=pointer]: Login
```