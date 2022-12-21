# book-record-management

Book recod management API

# Endpoints

# /users

POST: Create new user
GET: fetch list of all users

# /users/{id}

GET: get user details using ID
PUT: Update a user by their ID
DELETE: Delete a user by their ID
(check if the user have any issued book / fine to be collected)

# /users/subcription-details/(id)

GET: get user subscription details 1. Date of subcription 2. validity 3. fine if any

# /book

GET: Get all books
POST: Add a new book

# /book/{id}

GET: Get book by its ID
PUT/POST: update a book by ID

# /books/issued

GET: Get all issued books details

# /books/issued/withFine

GET: GEt all issued books with fine

# Subscription Types

Basic 3 months
Standard 6 months
Premium 12 months

if user has an issued book and the issued book is to be returned at a purticular date
if the user missed the date of return, then user gets a fine of 50Rs

if user has an issued book and the issued book is to be returned at a purticular date
if the user missed the date of return, the users subscription also got expired then the user need to pay fine of 150Rs (100 subscription fine + 50 )
