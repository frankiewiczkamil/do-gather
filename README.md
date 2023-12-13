Exercise project for learning next v13. It is an app for collaborative task management. It's like a todo list, but with more features (many lists, shared lists, etc.).

Additionally, tak-list is modeled as an aggregate root calculated from events (event sourcing).

It can be compared with simpler, more classical approach [that I've made in java](https://github.com/frankiewiczkamil/do-gather-java)

---
todo:
- improve task-list view
  - ~~action buttons~~
  - ~~task list itself~~
  - modal for delete confirmation
  - modal for invite user status
- extend task schema
  - consider progress percentage
  - consider comments for progress
- introduce activity tracking for task list
  - ~~add task list activity log~~
  - add view for task list activity log
  - ~~change read model for task list to the one based on activity log (aka event sourcing)~~
- add breadcrumb 
- fix signin check
