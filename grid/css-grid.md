## CSS GRID

CSS Grid Layout is the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system. 

### Terminology

![terminology]

- grid track : a continuous run between two adjacent grid lines — in other words, a grid column or a grid row.
- grid cell : any space bounded by four grid lines, with no grid lines running through it, analogous to a table cell.
- grid area : any rectangular area bounded by four grid lines, and made up of one or more grid cells.

An important thing to note is that these grid tracks, cells, and areas are entirely constructed of grid lines — and more importantly, do not have to correspond to grid items.

### Creating a Grid Container
The first step to creating a grid is defining a grid container. It could either be a `grid` or `inline-grid`.
![grid_container]

### Placing Grid Lines

* Fixed-width Grid Tracks

![create_gridline]

```css
#grid {
    display: grid; 
    grid-template-columns: [start col-a] 200px [col-b] 50% [col-c] 100px [stop end last]; 
    grid-template-rows: [start masthead] 3em [content] 80% [footer] 2em [stop end]; 
}
```

* Flexible Grid Tracks

![flexible_gridline]
```css
#grid {
    display: grid;
    grid-template-columns: 15em 4.5fr 3fr 10%;    
}
```

* Content-aware Tracks

![content_aware_gridline]
```css
#gallery {
    display: grid; 
    grid-template-columns: max-content max-content max-content max-content; 
    grid-template-rows: max-content max-content max-content;
}
```

* Repeat Grid Lines
![repeat_gridline]

```css
#grid {
    display: grid; 
    grid-template-columns: repeat( 3, 2em 1fr 1fr);
}
```

* Auto Fill Track
![auto_fill_track]
```css
#grid {
grid-template-columns: repeat( auto-fill, 2em) repeat( 3, 20em);    
}
```

### Grid Area

![grid_area_id]
```css
#grid {
    display: grid; 
    grid-template-areas: 
        "header header header header" "left ... ... right" 
        "footer footer footer footer"; 
    grid-template-columns: 1fr 20em 20em 1fr 1fr; 
    grid-template-rows: 40px 10em 3em 20px;
}
```

### Attaching Elements to the Grid
![attach_element]

```css
#grid {
    display: grid; 
    grid-template-rows: repeat( 5, [R] 4em); 
    grid-template-columns: 2em repeat( 5, [col-A] 5em [col-B] 5em) 2em;
} 
.one { 
    grid-row: R 3 / 7; 
    grid-column: col-B / span 2;
} 
.two { 
    grid-row: R / span R 2; 
    grid-column: col-A 3 / span 2 col-A;
} 
.three { 
    grid-row: 9; 
    grid-column: col-A -2;
}
```

### The Implicit Grid
![implicit_grid]
```css
#grid {
    display: grid; 
    grid-template-rows: 2em 2em; 
    grid-template-columns: repeat( 6, 4em);
}
.box01 { grid-column: 1; grid-row: 1 / 4;} 
.box02 {grid-column: 2; grid-row: 3 / span 2;}
.box03 { grid-column: 3; grid-row: span 2 / 3;} 
.box04 {grid-column: 4; grid-row: span 2 / 5;} 
.box05 {grid-column: 5; grid-row: span 4 / 5;} 
.box06 {grid-column: 6; grid-row: -1 / span 3;} 
.box07 {grid-column: 7; grid-row: span 3 / -1;}
```

### Using Area
![using_area]
```css
#grid {
    display: grid; 
    grid-template-areas: 
        "header header header header" 
        "leftside content content rightside" 
        "leftside footer footer footer";
} 
#masthead {grid-area: header;} 
#sidebar {grid-area: leftside;} 
#main {grid-area: content;} 
#navbar {grid-area: rightside;} 
#footer {grid-area: footer;}
```

### Grid Item Overlap
![grid_item_overlap]
```css
#grid {display: grid; 
grid-template-rows: 50% 50%; 
grid-template-columns: 50% 50%;} 
.box01 {grid-area: 1 / 1 / 2 / 3;} 
.box02 {grid-area: 1 / 2 / 3 / 2;}
```

### Grid Flow

* Auto Flow Row and Column
```html
< ol id =" grid" > 
    < li > 1 </ li > 
    < li > 2 </ li > 
    < li > 3 </ li > 
    < li > 4 </ li > 
    < li > 5 </ li > 
</ ol >
```
![grid_auto_flow_row]
```css
#grid {display: grid; width: 45em; height: 8em; grid-auto-flow: row;} 
#grid li {grid-row: auto; grid-column: auto;}
```

![grid_auto_flow_col]
```css
#grid {display: grid; width: 45em; height: 8em; grid-auto-flow: column;} 
#grid li {grid-row: auto; grid-column: auto;}
```

![flow_pattern]
The way row flow (if we may call it that) works is that you go across each row from left to right, and if there’s room for a grid item, you put it there. If a grid cell has been occupied by another grid item, you skip over it.

* Dense Flow
![dense_flow]
what happens with dense grid flow is that for each grid item, the browser scans through the entire grid in the given flow direction (row or column), starting from the flow’s starting point (the top-left corner, in LTR — left-to-right — languages), until it finds a place where that grid item will fit.

### Grid Gutters
![grid_gutter]
```css
#grid {
    display: grid; 
    grid-template-rows: 5em 5em; 
    grid-template-columns: 15% 1fr 1fr; 
    grid-gap: 12px 2em;
}
```

### Align Grids
Much Similar to flex box.

![align_grid]

### Layering and Ordering
By default, the grid items will visually overlap in document source order: grid items later in the document source will appear in front of   grid items earlier in the document source.

Another way you can affect the ordering of grid items is by using the `order` property. Its effect is essentially the same as it is in flexbox — you can change the order of grid items within a grid track by giving them order values. This affects not only placement within the track, but also __paint order__ if they should overlap.

![overlap_ordered]

## Reference
Meyer, Eric A.; Weyl, Estelle. CSS: The Definitive Guide. 


[terminology]: ./basic_component.png
[grid_container]: ./grid_container.png
[create_gridline]: ./create_gridline.png
[flexible_gridline]:./flexible_gridline.png
[content_aware_gridline]:./content_aware_gridline.png
[repeat_gridline]:./repeat_gridline.png
[auto_fill_track]:./auto_fill_track.png
[grid_area_id]: ./grid_area_id.png
[attach_element]: ./attach_element.png
[implicit_grid]: ./implicit_grid.png
[using_area]:./using_area.png
[grid_item_overlap]:./grid_item_overlap.png
[grid_auto_flow_row]: ./grid_auto_flow_row.png
[grid_auto_flow_col]: ./grid_auto_flow_col.png
[flow_pattern]:./flow_pattern.png
[dense_flowe]:./dense_flow.png
[grid_gutter]:./grid_gutter.png
[align_grid]:./align_grid.png
[overlap_source_order]:./overlap_source_order.png
[overlap_ordered]:./overlap_ordered.png

