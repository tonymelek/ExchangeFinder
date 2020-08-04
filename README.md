# ExchangeFinder
## Description
This Repo is a simple application that uses googlesheet single table as a database, having information about Telstra Exchange Locations in Victoria, inluding 
* Exchange name 
* 4 Alpha code 
* Address 
* Coordinates (longitude and latitude).

The application uses gscipt as a backend where the table can be converted to a `JSON` object and imported to the browser on file being loaded.

The idea and motive behind making this application was that when I was working as aTelecom subcontractor, I needed to go allover Victoria visiting many exchanges and in the begining all what I had for the exchanges data was a Word document with a table, I converted it to Excel to be a bit mmore useful, however it was still painful to find where the excel file is living on your mobile phone and start searching and then copying the address to paste it into the Maps app or the car GPS which was really **painful**. Later I learnt how to use gscript and here I came to the idea why don't I make something useful withat Excel spreadsheet and here it came into life and made ife much easier, without using any paid hosting or a real database (My SQL or so..), just utilising googlesheets, gscript fro backend


## Usage
Use the search bar to type an Exchange name or part of it to start search and with every key stroke the webpage updates itself with number of results found and displays them in a table below it.

**Note:** The search text is not case sensetive.

## Testing
You may try the app simply by following the link [Exchange Finder](https://tonymelek.github.io/ExchangeFinder/)

## Feedback
Please, send me any comments, questions, suggestions on my e-mail [tonymelek.au@gmail.com](mailto:tonymelek.au@gmail.com)


## License
© Tony Melek, All rights reserved
