# ViewChild
`@ViewChild ` is a decorator used for referring elements in a component template. <br>


### Usage 
```ts
@ViewChild( selector, {read: typeToken} ) sample: sampleType
```
- __selectors__
  - any class with the `@Component` and `@Directive` decorator
  - tempalte reference
  - provider
  - TemplateRef (`ng-template`)

- __read__: read a different token from the queried elements

The change detector looks for the first element or the directive matching the selector in the view DOM. If the view DOM changes, and a new child matches the selector, the property is updated. <br>

If we want to write component initialization code that uses the references injected `@ViewChild`, we need to do it inside the `AfterViewInit` lifecycle hook. <br>

## Example
```html
<h2 #title>Choose Brand Colors:</h2>

<color-sample [color]="primary" #primaryColorSample>
</color-sample>

<mat-input-container>
  <mat-label>Primary Color</mat-label>
  <input matInput #primaryInput [(colorPicker)]="primary" [(ngModel)]="primary"/>
</mat-input-container>
```

The webpage looks like this: 

![web_page][1]

Refer the `<color-sample>` instance with `@ViewChild`

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  .....

  @ViewChild(ColorSampleComponent)
  primarySampleComponent: ColorSampleComponent;

  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("primaryColorSample:", this.primarySampleComponent);
  }  
  .....
}
```

Print result: 

![output1][2]

Refer title: 
```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements  AfterViewInit {
  .....
  
  @ViewChild('title')
  title: ElementRef;

  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("title:", this.title.nativeElement);
  }

  .....
}
```

print result:

![output2][3]

We can see the `ElementRef` simply Wrap reference to the native DOM element. <br>

Using the `nativeElement` property, we can now apply any native DOM operation to the `h2` title tag, such as for example `addEventListener()`.  <br>


Refer `<color-sample>`

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements  AfterViewInit {
   ....
   
  @ViewChild('primaryColorSample')
  sample: ColorSampleComponent;

  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("sample:", this.sample);
  }

   ....
}
```

Output: 

![output3][4]

Default behavior of `@ViewChild` injection by template reference
- When injecting a reference applied to a component, we get back the component instance
- When injecting a reference tot a plain HTML element, we get back the corresponding wrapped DOM element

### Read property
If we want to get the DOM element of `<color-sample>`:
```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements  AfterViewInit {
   ....
   
  @ViewChild('primaryColorSample', {read: ElementRef})
  sample: ElementRef;

  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("sample:", this.sample.nativeElement);
  }

  ....
}
```

![output4][5]
Let's try open the color picker when the color sample gets clicked.  <br>
```ts
<h2 #title>Choose Brand Colors:</h2>

<color-sample [color]="primary" #primaryColorSample (click)="openColorPicker()">
</color-sample>

<mat-input-container>
  <mat-label>Primary Color</mat-label>
  <input matInput #primaryInput [(colorPicker)]="primary" [(ngModel)]="primary"/>
</mat-input-container>
```
```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  primary = '#1976d2';

  @ViewChild('primaryInput', {read: ColorPickerDirective})
  colorPicker: ColorPickerDirective;

  openColorPicker() {
    this.colorPicker.openDialog();
  }
}
```

# References
[Angular @ViewChild: In-Depth Explanation](https://blog.angular-university.io/angular-viewchild/) <br>
[Angular ViewChild](https://angular.io/api/core/ViewChild) <br>
[GitHub - Angular-ViewChild-Example](https://github.com/angular-university/angular-viewchild-examples)

  [1]: ./web_page.png
  [2]: ./output1.png
  [3]: ./output2.png
  [4]: ./output3.png
  [5]: ./output4.png
