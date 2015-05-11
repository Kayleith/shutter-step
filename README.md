# Shutter Step

[Heroku link][heroku]

[heroku]: http://shutter-step.herokuapp.com
GO SEE MY APP WHOOOOOOOTT

## Minimum Viable Product
Shutter Step is social network that is a clone of facebook, but also has an added feature that lets you mark down photos and thier gps coordinates. This allows other users to use google maps to go see your photos.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [ ] Create Main Feed Page
- [ ] Create Profile Pages
- [ ] View Pictures
- [ ] Subscribe to Photographers
- [ ] View a feed of subscribed and friends
- [ ] Add Friends
- [ ] Search for Pages by friend name and photographer name
- [ ] Search for pictures by location

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
I will make up a sign up page. Right now it will look like the Facebook page. But the design is old. I want a more modern scroll down look. Currently only available to those who have accounts. But eventually want to implement anyone can use the app, but only those with accounts can favorite and subscribe and upload their own pictures.

[Details][phase-one]
### Phase 2: Controllers (~1 day)
Need to make models for pictures and a controller. From there I need to add joining tables but for now, need to just make a photo db. Add a simple form that adds a picture.

### Phase 3: Main Feed Page (~2 days)
This is the bulk of the work. I want a scrolling feed on the left. Map on the right. Filtering in the middle. I need to seed my database with test users and projects. Header
