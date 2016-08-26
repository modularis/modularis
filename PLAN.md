# Plan
## class Component
### Dependencies
- Init dependencies and store them in this.cmp
- trigger template loading and resolve init promise when loaded
- Init returns promise
### registerComponents
- Run automatically after Dependencies and store templates in app.templates
- Resolve.all(this.cmp).then boot all this.cmp
