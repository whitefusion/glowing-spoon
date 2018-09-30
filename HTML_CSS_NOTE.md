> This is the note for 'HTML and CSS design and build websites'.

# Structures
HTML is consisted of **elements**.  <br>
Each element may have many **attributes**. They are made up of two parts: a name and a value (a property).<br>

- `<body>`: everything inside it is shown inside the main browser window.
- `<head>`: before `<body>`, this contains information about the page (rather than information that is shown within the main part of the browser window)
- `<title>`: the content always shown in top of the browser or on the tab.
```html
<html>
  <head>
    <title></title>
  </head>
  <body>
  </body>
</html>
```
### Summary on Structure
- Tags are often referred to as elements
- Opening tags can carry attributes, which tell us more about the content of that element.

# Text
Two types of tags (known as markups) :
- **Structural markup**: the elements we can use to describe both headings and paragraph.
- **Semantic markup**: provides extra information such as emphasis, quotation or acronyms.

## HEADINGS
`<h1>...<h6>`

## PARAGRAPHS
`<p>`
By default, a browser will show each paragraph on a new line with some space between it and any subsequent paragraphs.

## BOLD & ITALIC
`<b>` <br>
`<i>`

## SUPERSCRIPT && SUBSCRIPT
`<sup>` <br>
`<sub>`

## WHITE SPACE
In order to make code easier to read, web page authors often add extra spaces or start some elements on new lines. <br>

When the browser comes across two or more spaces next to each other, it only displays one space. Similarly if it comes across a line break, it treats that as a single space too. This is known as **white space collapsing** . 

## LINE BREAK & HORIZONTAL RULES
`<br/ >` : line break <br>
`<hr/ >` : horizontal rule <br>

There are a few elements that do not have any words between an opening and closing tag. They are known as **empty elements** and they are written differently. <br>

An empty element usually has only one tag. Before the closing angled bracket of an empty element there will often be a space and a forward slash character. Some web page authors miss this out but it is a good habit to get into. 

# SEMANTIC MARKUP

## STRONG & EMPHASIS
`<strong>`: by default, browsers will show the contents of a `<strong>` element in bold. <br>
`<em>`: emphasis, shown in italic. <br>

## QUOTATIONS
`<blockquote>`:  used for longer quote that take up an entire paragraph. <br>
`<q>`: used for shorter quote.

## ABBREVIATIONS & ACRONYMS
`<abbr>`: A title attribute on the opening tag is used to specify the full term. <br>
`<abbr title='Professor'>Prof</abbr>`

## CITATIONS & DEFINITIONS
`<cite>`: Browser will render the content of a `<cite>` element in italics. <br>
`<dfn>`: The first time you explain some new terminology in a document, it is known as the defining instance of it. Some browsers render it in italics, some others do not change its appearance.

## AUTHOR DETAILS
`<address>`: display in italics usually.
```html
<address>
  <p><a href='mailto:homer@example.org'>homer@example.org</a></p>
  <p>742 Evergreen Terrace. Springfield</p>
</address>
```
## CHANGES TO CONTENT
`<ins>`: used to show content that has benn inserted into a document, rendered as underlined. <br>
`<del>`: show text that has been deleted from it. rendered as a line through the center.<br>
`<s>`: indicate something that no longer accurate or relevant. Visually the content of an `<s>` element will usually be displayed with a line through the cneter.

# LISTS
## ORDERED LISTS
`<ol>`: ordered list  <br>
`<ul>`: unordered list <br>
`<li>`: list item <br>

`<dl>`: definition list is created with the `<dl>` element and usually consist of a series of terms and their definitions. inside the `<dl>` element you will usually see pairs of `<dt>` and `<dd>` elements. <br>
`<dt>`: This is used to contain the term being defined. (positive number) <br>
`<dd>`: This is used to contain the definition. (integer bigger than 0) <br>

## NESTED LISTS
Put `<ul>` and `<li>` group under normal `<li>`.

# LINKS
## LINKING TO OTHER SITES
`<a>`: Links are created using the `<a>` element which has an attribute called `href`. The value of the `href` attribute is the page that you want people to go to when they click on the link. <br>
When you link to a different website, the value of the href attribute will be the full web address for the site, which is known as an **absolute** URL. <br>
When you are linking to other pages within the same site, you do not need to specify the domain name in the URL. You can use a shorthand known as a **relative** URL. 

- same folder: to link to a file in the same folder, just use the file name.
- child folder: use name of child folder
- grand child folder: name of child folder followed by the name of grandchild 
- parent folder: use ../
- grandparent folder: repeat ../

## EMAIL LINKS
`mailto:`: create a link that starts up the user's email program. 

## OPENING LINKS IN A NEW WINDOW
`target`: If you want a link to open in a new window, you can use the target attribute on the opening `<a>` tag. The value of this attribute should be _blank.  
```html
<a href='http://www.imdb.com' target='_blank'> Internet Movie Database </a>
```



