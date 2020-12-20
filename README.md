# Aegis Distribute Node
Calls multiple other Aegis functions with the provided data. Or just constantly calls other functions :)

## Environment variables
- `URLS` - a whitespace-separated list of Aegis nodes to call
- `SYNC` -  if true, will call each target function in succession. If false, awaits each in a Promise.all
- `AUTO` - if true, will call targets automatically (without any data). If false, will only run when its route is called.
