## CSS优先级

When the same element selected by the same operator, the property value might collapse.
- Specificity: different kinds of selectors
- Inheritance: Implicit style
- Cascade: resolve conflicts among the same specificity

### Specificity
A selector's specificity is determined by the components of the selector itself. <br>
A specificity could be represented by a tuple with four numbers, like (0,0,0,0) <br>
The actual specificity of a selector is determined as follows:
- For every ID attribute: add (0,1,0,0)
- For every class attribute, attribute selection, or pseudo-class given in the selector: add (0,0,1,0)
- For every element and pseudo-element given in the selector, add (0,0,0,1)
- Combinators and universal selector do not cotribute anything to specificity

Examples: 
```css
p em {color: red} /*0,0,0,2*/
*.bright {color: yellow} /*0,0,1,0*/
p.bright em.dark {color: maroon} /*0,0,2,2*/
div#sidebar *[href] {color: silver} /*0,1,1,1*/
```

#### Universal Selector Specificity
The universal selector does not contribute to specificity. <br>
It has a specificity of (0,0,0,0) which is different than having no specificity, such as combinators. <br>

#### ID and Attribute Selector Specificity
It is important to note the difference in specificity between an ID selector and an attribute selector that targets an `id` attribute. <br>
```css
html > body table tr[id="totals"] td ul > li {color: black} /*0,0,1,7*/
li#winner {color:gray} /*0,1,0,1*/
```
#### Inline style specificity
The first 0 is reserved for inline style declartions, which trump any other declaration's specificity. 

### Importance
Declarations that are marked `!important` do not have a special specificity value, but are instead separately from non-important declarations. 

### Inheritance
Inheritance is the mechanism by which some styles are applied not only to a specified element, but also to its descendants. <br>
For example, if a color is applied to an `h1` element, for example, then that color is applied to all text inside the `h1`, even the text enclosed within child elements of that `h1`:
```html
<style>
    h1 {color:gray;}
</style>

<h1>Fruits are on <em> SALE !</em> </h1>
```
Something need to keep in mind: 
- Many properties are not inherited, such as border, margin, padding...
- Inherited values have no specificity at all, not even zero specificity.
```html
<style>
    h1#page-title {color:black;}
    * {color:gray;}
    /* h1 > em {color: inherit;} */
</style>

<h1 id="page-title">Fruits are on <em> SALE !</em> </h1>
```

### The Cascade （堆叠）
```css
h1 {color: red;}
h1 {color: green;}
```
CSS is based on a method of causing styles to _cascade_ together, which is made possible by combining inheritance and specificity with a few rules. 
1. Find all rules that contains a selector that matches a given element.
2. Sort all declarations applying to the given element by explicit weight. Those rules marked `!important` have a higher weight than those that are not. 
3. Sort all declarations applying to the given element by _specificity_. Those elements with a higher specificity have more weight than those with a lower specificity.
4. Sort all declarations applying to the given element by order. The later a declaration appears in the style sheet or document, the more weight it is given. Declarations that appear in an imported style sheet are considered to come before all declarations within the style sheet that imports them. 



