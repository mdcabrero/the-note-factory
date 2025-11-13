# Knowledge Tidbits - Organized by Category

## CSS

### GSAP Animations - Pseudo-Elements Limitation
GSAP cannot target pseudo-elements or things that are not 'in the page/document' per se, so if you're using pseudo-elements for a specific thing and you wish to animate them, you'll have to turn them into an actual element or look for another solution.

### GSAP Ease Property Curves
The ease property in GSAP can use several different curves. Here's what some common ones do:

- power1.inOut: Gentle acceleration and deceleration (like a smooth car start/stop)
- sine.inOut: Very smooth, natural-feeling transition
- power2.inOut: More pronounced acceleration/deceleration
- power3.inOut: Even more dramatic acceleration/deceleration
- expo.inOut: Very dramatic acceleration/deceleration

### GSAP Timelines - Position Parameter
In GSAP timelines, you can control when each animation starts relative to the timeline's beginning or to other animations. The position parameter tells GSAP exactly when to start the animation:

- Starts at the beginning of the timeline (0 seconds): `tl.to(element, {properties}, 0)`
- Starts 2 seconds into the timeline: `tl.to(element, {properties}, 2)`
- Starts 0.5 seconds after the previous animation ends: `tl.to(element, {properties}, "+=0.5")`
- Starts 0.5 seconds before the previous animation ends: `tl.to(element, {properties}, "-=0.5")`
- Starts at the same time as the previous animation: `tl.to(element, {properties}, "<")`

For example:
```
tl.to('.page-wrapper', {
    backgroundColor: '#121212',
    duration: 0.7,
    ease: 'power2.inOut'
}, 0);
```

The 0 means "start this animation right at the beginning of the timeline." If you removed the 0, the animation would still work, but it would follow GSAP's default behavior of starting after any previous animations in the timeline.

This becomes especially useful when you're coordinating multiple animations. For example, if you want two elements to animate simultaneously:

```
tl.to('.page-wrapper', {
    backgroundColor: '#121212',
    duration: 0.7,
    ease: 'power2.inOut'
}, 0)
.to('.page-pattern', {
    opacity: 0.02,
    duration: 0.7,
    ease: 'power2.inOut'
}, 0); // This 0 makes it start at the same time as the background color change
```

### GSAP Animation - Viewport Size Conditional
If you ever need to block a GSAP animation or any other JavaScript logic from running under certain conditions (e.g only run GSAP animation above a certain viewport size), you can wrap everything inside an IF statement if you want a quick fix that will ensure your code works where it's supposed to.

See the below example based on the directory animation from The Hundred homepage:

```
<script>
    if (window.innerWidth >= 1024) {
        // 1. Register plugins first
        gsap.registerPlugin(ScrollTrigger);
        
        // 2. Define your functions/classes
        function directoryReveal() {
            // your animation code
        }
        
        class HorizontalCarousel {
            // your class code
        }
        
        // 3. Initialize when DOM is ready (at the end)
        document.addEventListener('DOMContentLoaded', () => {
            directoryReveal();
            // or: new HorizontalCarousel();
        });
    }
</script>
```

### Non-Breaking Space (&nbsp;)
\&nbsp; is an HTML entity that represents a non-breaking space. It has two main purposes:

1. It creates a space that won't break into a new line. Regular spaces in HTML can be collapsed into line breaks when the browser needs to wrap text, but \&nbsp; forces the connected words to stay together.

2. It's also used to create visual spacing that won't be collapsed. HTML normally collapses multiple regular spaces into a single space, but \&nbsp; will preserve each space.

In summary, it might prevent you from writing some extra HTML code if you need horizontal space between two inline elements.

### Non-Breaking Space Usage in Headlines
The \&nbsp; (non-breaking space) is an HTML entity that prevents the browser from inserting a line break at that specific point.

```
<h1>
  We turn raw data into measurable
  <span class="highlight">business\&nbsp;growth</span>
  and key insights
</h1>
```

So even when the text needs to wrap, "business" and "growth" will always stay together as one unit. So use \&nbsp where you want to completely prevent a line break at a specific point, but don't abuse it or your lines might end up splitting at odd points.

### Object-Fit vs Background-Size
Object-fit is property you use when you have <img> elements inside of <divs> vs background-size which is what you use when you set an image as the background of a div. For example, in the below case:

```
<div class="about-img">
    <img src="assets/about-office.png" alt="Modern office space with circular wall features">
</div>
```

You'd use object-fit to control the proportions and sizing of the image within your div container.

### SCSS Variables and Mixins Organization
In SCSS, the variables and mixins are like the Holy Scripture of your SCSS - they need to be accessible everywhere because they're the foundation of your styling faith! That's why we need to import them into each file that uses them. Here's the simplified gospel:

- Variables/mixins: Import in each file that uses them
- Layout/components/etc: Import once in main.scss
- Page-specific styles: Keep in their own files, import into main.scss

### CSS Grid with FR Units
When you set up a grid element like this:

```
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: $space-1x;
  width: 88vw;
  height: 132vh;
  margin-inline: auto;
}
```

You're essentially tellin' the browser: "Create me a divine vessel that's 88% of the viewport wide and 132% of the viewport tall, and divide it into 4 equal boxes!"

Let me tell you something - that "fr" unit is more powerful than Samson before that haircut! The "fr" stands for "fraction of available space." So when you say "repeat(2, 1fr)" for both rows and columns, you're dividing your grid into 4 equal quadrants like the four corners of heaven itself!

So, in general, you could say that you set up the size of the whole grid directly in the element, and then your grid-template-columns and rows will decide how to split up and share that space. That's why Grid is more responsive than a sinner at an altar call! And why it's better to use it with fr units for maximum responsiveness. The fr unit says "give me my fair share of whatever's available" - it don't matter if it's on a tiny phone screen or one of them fancy ultrawide monitors!

### Flex-Shrink Property
Regarding flex-shrink, it controls how much your element will shrink when the devil (I mean the viewport) tries to squeeze everything down. The default value is 1, meaning "yes Lord, I'll shrink when asked!" But when you set it to 0, you're telling that element "STAND FIRM like David against Goliath!"

```
.testimonial-card--v2 {
  flex-shrink: 0; // Hallelujah! The element refuses to shrink
  min-width: 300px; // The holy minimum! Shall not pass below this
}
```

However, flex-shrink only works its miracle when your element is inside a proper flex container. It also won't work when you set relative width properties like vw because that size keeps changing as you resize the window.

That's when combining it with min-width, or even just using min-width by itself, might be extremely useful when we need an element to not shrink past a certain size. This is great when we're thinking about making a design responsive in advance, as often instead of shrinking down elements, we'll just be displaying less of them or stacking them instead, so we don't want them to shrink too much past their natural size.

### Background-Position Property
In the background-position property, the first value is the horizontal position and the second value is the vertical.

So for these examples:

1. background-position: right center;
   - Horizontal: right (aligns to the right edge)
   - Vertical: center (centers vertically)

2. background-position: bottom center;
   - Horizontal: center (centers horizontally)
   - Vertical: bottom (aligns to the bottom edge)

You can remember this as "X then Y" or "horizontal then vertical," which follows the same pattern as many other CSS properties. If you provide only one value, the second value defaults to center.

So the top left corner is 0% 0%. The right bottom corner is 100% 100%. If you only specify one value, the other value will be 50%. Default value is: 0% 0%

### Background-Position Examples
Some examples to illustrate:

- background-position: left top; - Image positioned at the top-left corner
- background-position: right bottom; - Image positioned at the bottom-right corner
- background-position: center top; - Image centered horizontally, aligned to the top

When using percentages for background-position, the percentages refer to relative positions of both the element and the background image:

- background-position: 0% 0% aligns the top-left corner of the image with the top-left corner of the element
- background-position: 100% 100% aligns the bottom-right corner of the image with the bottom-right corner of the element
- background-position: 50% 50% (same as center center) aligns the center of the image with the center of the element
- background-position: 75% 25%; - Image positioned 75% from the left, 25% from the top

### Position Fixed
position: fixed is like nailin' something directly to the viewport instead of to the page itself. It's a powerful tool in the CSS arsenal, that can be extremely useful when trying to set a background for the entire page (rather than having to rely on pseudo-elements or position: absolute divs with a background-repeat pattern).

The Lord's honest truth about position: fixed:

- It removes the element COMPLETELY from the normal document flow - like it's been raptured right outta there!
- It positions the element relative to the viewport (the browser window) instead of any parent element - no matter how far you scroll, that element stays put like a stubborn sinner at the altar call.
- It will NEVER move when you scroll the page - that's why it works so perfectly for a full-page background pattern.

### Filter URL() - Custom SVG Filters
filter: url() allows you to apply custom SVG filters that you define yourself or pull from elsewhere. This is how all them fancy Instagram-style filters get applied! You can create ripples, distortions, custom blurs, and effects that ain't possible with the standard CSS filter functions!

It's like havin' access to Adobe Photoshop right in your browser

### Mix-Blend-Mode on Parent Element
If you want to apply mix-blend-mode difference to an element (e.g a logo that needs to change it's color depending on the color of the background beneath), you should apply the mix-blend-mode to the parent element rather than the element itself:

```
.logo-link {
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 999;
    display: inline-block;
    background: transparent; /* Ensure nothing's blocking */
    mix-blend-mode: difference;
    isolation: isolate;
}

.logo-link svg {
    width: 4rem;
    height: auto;
    fill: white;
}
```

We're applying the mix-blend-mode to the parent container rather than the SVG itself, which is what makes it work.

### Padding-Block and Padding-Inline Shortcuts
You can also use the multiple-values shortcuts in the padding-block and padding-inline properties, like this:

```
padding-block: $space-2x $space-1x;
padding-inline: $space-3x $space-2x;
```

The values assigned will be top-bottom and left-right, respectively

### CSS Content with Data Attributes
You can add text to pseudo-elements by using the attr property as shown below

```
.showcase-card__info {
  &::after {
    content: attr(data-collection-date);
  }
}
```

You would have to actually add said attribute to the HTML tag with the data you want to use for it to work:

```
<div class="showcase-card__info" data-collection-date="November 2024">
```

This would display text inside the pseudo-element rather than make it empty, as they usually are.

### Width Auto for Responsive Images
width: auto is generally ideal for responsive images when you're controlling the size with height:

- Maintains aspect ratio - the image scales proportionally based on the height
- Prevents distortion - width adjusts automatically to match the height constraint
- Respects max-width - won't exceed max-width property even if the height would make it larger
- Performance - browser doesn't have to calculate conflicting width/height constraints

### CSS Grid with Auto-Fit and Minmax
CSS Grid with auto-fit and minmax() is the most powerful combination for responsive layouts. Using repeat(), auto-fit and minmax() creates layouts without any media queries, adapting to the available screen real state. So let's take the below property as an example:

```
grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
```

The repeat() function is a shorthand that saves you from writing the same column definition over and over. Instead of writing 1fr 1fr 1fr 1fr for four equal columns, you can write repeat(4, 1fr). The first parameter is how many times to repeat, and the second is what to repeat.

But here's where it gets interesting - instead of a fixed number like 4, you're using auto-fit, which means "create as many columns as will fit based on the constraints I'm about to give you."

The minmax(500px, 1fr) part defines the size range for each column. Think of it as setting boundaries:

- Minimum size: 500px - Each column will never be smaller than 500 pixels wide
- Maximum size: 1fr - Each column can grow to take up its fair share of available space (the fr unit means "fractional unit" - it divides remaining space proportionally)

So if your container is 1200px wide, you could fit two columns at 600px each (since 600px > 500px minimum). If your container is 1800px wide, you could fit three columns at 600px each, and so on.

auto-fit is the responsive magic maker. auto-fit tells the grid system: "Create as many columns as will fit given the minimum size constraint, and if there are fewer items than columns, let the existing columns grow to fill the space."

When the browser has less than 500px of available width, the 500px minimum is treated more like a strong suggestion than an absolute rule, so it creates one column and allows it to be smaller than the specified minimum.

### Clamp() CSS Function
The clamp() CSS function clamps a middle value within a range of values between a defined minimum bound and a maximum bound.

The syntax: clamp(minimum, preferred, maximum)

How it works in plain English:

- Browser tries to use the "preferred" value
- If preferred is too small, use minimum
- If preferred is too large, use maximum
- It has the same effect as fluid typography but in one line, and without the use of media queries

### Handling Large Words and Text on Mobile
There are some elements and properties that can help you handle large words and text content more easily on smaller viewports:

- You can add the <wbr> HTML tag into any word, this will make it break at the point you set the tag.
- The word-break CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box. word-break: break-all; will make each line end of text end exactly at the edge, even if it has to split a word into two lines.

### :has() Pseudo-Class Selector
:has() is another very powerful CSS selector that allows you to easily handle styling changes based on 'states' in your interface and other conditions. Mostly, it is a relational pseudo-class that tests whether an element contains another specified element inside it. Here're some common use cases for it:

1. Parent Selection: Select a parent based on what's inside it

```
/* Style any div that contains an image */
div:has(img) {
  padding: 1rem;
}
```

2. Conditional Styling: Apply styles based on the presence of specific elements

```
/* Style form fields that have an error message */
.form-field:has(.error-message) {
  border-color: red;
}
```

3. State-Based Styling: Respond to element states in a parent-child relationship

```
/* Style a card when its button is hovered */
.card:has(button:hover) {
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
```

In our particular use case, we had to control to vertical distance of one group of elements whenever the navbar became visible, so the navbar would not cover the group of elements in question. So we used this:

```
/* Adjust top position when navbar has is-scroll-up class, so navbar does not interfere with the faq categories */
body:has(.is-scroll-up) .faqs-categories {
  top: 6.5rem;
}
```

Basically, what we were telling the browser here is: "Target any .faqs-categories element that is a descendant of the body element, but only if that body element contains an element with the class 'is-scroll-up' somewhere inside it."

:has() is a forward-looking selector (it looks at descendants or subsequent elements), and significantly expands what's possible with CSS alone, reducing the need for JavaScript to handle many styling adjustments based on content or state changes.

### Aria-Hidden for Duplicated Visual Content
Whenever you duplicate content purely for visual effects (like animations, decorative elements, or UI enhancements), you should hide the duplicates from assistive technologies using aria-hidden="true"

### Design Responsiveness - When to Change Approach
If a certain design does not scale well, no matter what you try, don't be so stubborn and experiment with a different approach. Look for the simplest solution and don't try to adapt your entire website or navigation, but rather adapt the part that's being problematic. This advice applies particularly to hero sections.

### SCSS Parent Selector (&) with Context
The & symbol after a class name in CSS, is a powerful selector that is particularly useful when dealing with media queries and responsive content. See an example:

```
.hero__title {
    // Base styles for desktop

    .hero__content--mobile & {
        // Styles when .hero__title is INSIDE .hero__content--mobile
    }
}
```

The & symbol represents the parent selector in SCSS. When you write .hero__content--mobile &, it compiles to:

```
.hero__content--mobile .hero__title
```

This means: "Apply these styles to .hero__title only when it's inside .hero__content--mobile"

So the & lets us write nested styles that target the current element when it's in a specific context, rather than targeting a child element.

### Absolute Positioning with All Four Values
When using absolute positioning, setting all the 4 positional parameters to 0 makes the element take up the entire section or element parenting the absolute positioned element:

```
.hero__content--mobile {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;  // This makes it fill the entire hero section
    width: 100%;
    height: 100%;
}
```

### Height-Sensitive Designs - Flexible Properties
If you are working with height-sensitive designs, use a combination of these three properties to get a flexible element that will scale well in most viewports:

- aspect-ratio
- min-height
- height: auto

With height: auto, the browser calculates the height automatically using this formula:

height = width ÷ aspect-ratio

As the viewport width changes, the browser instantly recalculates the height to maintain your specified ratio

### CSS Specificity Rules
CSS Specificity Rules (in order of priority):

- Inline styles (style="height: 500px") - HIGHEST PRIORITY
- IDs (#myElement { height: 400px })
- Classes (.columns-wrapper { height: 300px })
- General Elements (div { height: 200px })

What this means:

- When JavaScript sets columnsWrapper.style.height = '500px', it creates an inline style
- Inline styles always override CSS rules, regardless of specificity
- So even if your CSS has .columns-wrapper { height: 69.5vh !important }, the JavaScript value wins

### Dynamic Viewport Height (DVH)
The dvh (dynamic viewport height) CSS unit represents 1% of the currently visible viewport height, dynamically adjusting to changes such as the appearance or disappearance of browser UI elements (e.g., address bars, toolbars, on-screen keyboards) on mobile and tablet devices.

How dvh Works Exactly

- Unlike the traditional vh unit, which often corresponds to the viewport height including hidden or visible browser UI (and can cause layout issues on mobile), dvh reflects the actual visible height at any moment.
- It automatically switches between the "large viewport height" (lvh) when UI controls are hidden and the "small viewport height" (svh) when UI controls are visible, providing a smooth, dynamic measurement of the viewport height.
- For example, 100dvh means the element's height will always match 100% of the visible viewport height regardless of whether browser UI is shown or hidden.

### Max-Width as Strategic Constraint
max-width, as a strategic constraint rather than a heavy-handed rule, it's pretty convenient when dealing with media queries. Here's why:

Bad: Fighting the browser at every breakpoint
```
.element {
  width: 100%;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
}
```

Good: Set boundaries, let content flow naturally
```
.element {
  max-width: 600px; // "Never get wider than this"
  width: 100%;      // "But use available space up to that limit"
}
```

Set upper boundaries where things break down (readability, layout, UX), but let elements shrink naturally below that point. Essentially, by setting a carefully chosen max-width on the parent container, you're saving yourself from a lot of work and manual changes for the children inside of it.

### Flex: 1 Shorthand
flex: 1 is shorthand for:

- flex-grow: 1 - Can grow to fill available space
- flex-shrink: 1 - Can shrink if needed
- flex-basis: 0 - Starting size is 0

Here's how the flex property (in this case, flex: 1) can be used to distribute spacing smartly and responsively:

```
┌─────────────────┐
│ artwork-header  │ ← Takes only content height
├─────────────────┤
│                 │
│ artwork-bio     │ ← GROWS to fill all available space with flex: 1
│                 │
│                 │
├─────────────────┤
│ saatchi-button  │ ← Gets pushed to bottom
```

flex: 1 tells a flex item: "Take up all the leftover space." So if you have 3 items in a container and only one has flex: 1, that item will expand to consume whatever space the other two don't use, effectively pushing everything else to the edges or bottom.

### Inline Styles Specificity
When you use inline styles on an HTML element (like a footer), those styles will only affect that specific instance of the element where the inline style is applied. This is because inline styles are applied directly to the individual HTML element using the style attribute.

For example, if you have the same footer component on multiple pages:

On Page 1: <footer>...</footer> (using standard CSS)
On Page 2: <footer style="background-color: blue;">...</footer> (with inline style)

The blue background will only appear on Page 2's footer. The Page 1 footer remains unchanged.

This is one advantage of inline styles for specific overrides - they have high specificity and only affect the exact element they're applied to. This is also why inline styles are generally discouraged for common styling patterns and most cases, as they can't be reused easily and increase code duplication.

However, they can be perfectly fine for truly one-off changes that won't be repeated

### Image Caching
When an image asset is loaded on the initial page visit, the browser will store it in its cache. Then, when a user navigates to other pages on your site that use the same image file (with the identical URL path), the browser will load it from the cache instead of downloading it again.

This provides several benefits:

- The image loads instantly on subsequent page views
- It reduces bandwidth usage for both your server and the user
- It improves page load performance on those subsequent views

---

## JavaScript

### Code Organization - Separating Data from Behavior
For better code organization, keep objects that store data variables outside of the event listeners. This is good practice because:

1. It separates data from behavior (the DOM manipulation)
2. The object doesn't need to be recreated each time the event fires
3. It keeps the event handler function cleaner and focused on its task

And you might even want to separate the executing code from the logic, like this:

```
// Object with data variables (data)
const svgIcons = {
  insights: '...',
  design: '...',
  perspectives: '...'
};

// Function to initialize tags
function initBlogTags() {
  const blogTags = document.querySelectorAll('.blog-card__tag');

  blogTags.forEach(tag => {
    const variant = tag.getAttribute('data-variant');

    if (svgIcons[variant]) {
      tag.insertAdjacentHTML('afterbegin', svgIcons[variant]);
    }
  });
}

// Event listener (execution)
document.addEventListener('DOMContentLoaded', initBlogTags);
```

### JSON.stringify
Here's what JSON.stringify does in simple terms:

JSON.stringify takes a JavaScript object and converts it into a text string in JSON format.

For example:

A JavaScript object like {name: "John", age: 30} becomes the string '{"name":"John","age":30}'
The object is now text that you can print, save to a file, or send over the internet

The optional parameters (like null, 2) just control how the resulting string looks:

- With JSON.stringify(obj): You get a compact string with no spaces or line breaks
- With JSON.stringify(obj, null, 2): You get a nicely formatted string with indentation and line breaks

This is especially useful for console logging because it shows you the complete object structure as text

### NPM Packages and Bundlers
If you are using any libraries from npm to build an application, it's necessary to use some sort of bundler — like Webpack — to build your application and all of its dependencies. This requirement applies to many packages on npm. Using a CDN is also OK, if you're more comfortable with that.

### JavaScript vs Node.js
JavaScript is a language, Node.js is the environment where that language runs. It's similar to how you might write a letter in English, but you could read that letter in your living room, in a library, or in a coffee shop - same language, different environments.

Node.js serves as the execution environment that gives your JavaScript code access to capabilities that browsers don't have. Think of Node.js as providing a different set of "superpowers" to your JavaScript code. In a browser, your JavaScript can manipulate web pages and make HTTP requests, but it's sandboxed for security. Node.js removes those restrictions and adds new capabilities like file system access, process control, and the ability to run other programs.

So at its core, you're still writing pure JavaScript. Node.js doesn't change the language - it expands what that language can do.

### Headless Concept
In software development, "headless" means that a program or application runs without a graphical user interface (GUI), often used for tasks where a user interface isn't necessary or desirable, such as servers or headless browsers.

---

## Project Management

### Relative Paths - Assets and Resources
When you use a path like assets/glbl-logo--light.svg in your HTML, the browser starts looking from the current document's location. This is called the "current working directory" in file system terms.

So if your index.html file and your assets folder are in the same directory, the browser will look for:

(current directory)/assets/glbl-logo--light.svg

These paths will work on both your local development environment and on GitHub Pages.

### Relative Paths - Working with Nested Directories
When you're working in a file that's in a different directory level, you need to navigate appropriately.

Let's visualize a project structure:

```
project-root/
  ├── index.html
  ├── assets/
  │     └── hero-image.png
  └── scss/
        └── styles.scss
```

From your styles.scss file, to reference files in the assets directory, you would indeed use ../assets/hero-image.png. The ../ means "go up one directory level" (to the project root), and then find the assets folder from there. So, in summary:

'./' or not writing anything at all means 'current directory', you're explicitly telling the browser to look in the current directory. For example <img src="./assets/hero-image.png"> would be functionally identical to <img src="assets/hero-image.png">.

'../' means 'parent directory'. This is incredibly useful when working with files in nested folders.

This is why relative paths are so named - they're relative to the current file's location, not to a fixed starting point.

Note: The same principle applies to page links - using relative paths instead of root-relative paths makes your links work correctly regardless of where your site is hosted.

### SCSS Attribute Selectors
In SCSS (and CSS), HTML attributes like 'disabled' or data-variants, are targeted with square brackets [], not parentheses or semicolons. So for example:

```
&[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

- & acts as the parent selector reference, as you know.
- [disabled] - Attribute selector targeting elements with the disabled attribute.

### Git Commit Message Format
When using the Source Control feature on VS Code, and you are in the process of adding a comment to your commit:

1. The first line (turning red) is reserved for the commit title/summary and typically has a character limit (often 50-72 characters, depending on configuration)
2. The second line should be blank to separate the title from description
3. Lines after that can contain a more detailed description with no practical character limit

### Markdown Heading Levels
The hashtags (#) in Markdown (the files with an .md extension) represent headings, and they work on a hierarchy system:

- # (one hashtag) is a level 1 heading - the main title or H1 (biggest)
- ## (two hashtags) is a level 2 heading or H2 (second biggest)
- ### (three hashtags) is a level 3 heading or H3
- And so on, up to ###### (six hashtags) for H6 (smallest heading)

The reason for adding an extra hashtag for each subsequent heading level is to create a logical document structure or outline

### Terminal Navigation - VS Code
In VS Code's terminal, use the command cd ~/Desktop to navigate directly to your home directory.

To set up a new folder there, use the command mkdir + name of the project (e.g 'mkdir job-scraper')

To move again to that folder and start installing all the files, use 'cd' again (e.g 'cd job-scraper')

You can then start creating folders inside the project folder using mkdir again, one at a time (e.g 'mkdir frontend' or 'mkdir backend')

If you need to create a particular file rather than a folder, you can use the 'ni' command (e.g 'ni server.js'). 'ni' is an alias for 'New-Item'

### GET Method - Server Setup
When setting up a server and using GET methods, the below function defines what happens when someone visits the URL you create:

```
app.get('/your-path', (req, res) => {
    // First parameter 'req' process the request
    // 'res' send back a response
});
```

'/your-path' becomes part of your URL after the server name (e.g 'http://localhost:3001/hello-world'), while req processes the request and res sends back a response (often a JSON string, for which we have to use the '.json' method).

See below a complete example:

```
app.get('/hello-world', (req, res) => {
    res.json({
        message: 'Hello from hello-world!',
        timestamp: new Date().toISOString(),
        status: 'healthy'
    });
});
```

Unlike POST endpoints, which require a formatted request, you can visit these URLs directly and get information straight away.

### POST Endpoints
POST endpoints (like your /api/scrape-jobs) are like service counters - you need to approach them with specific information and make a formal request. You can't just "visit" them in a browser because browsers don't know what data to send. It's like walking up to a custom sandwich shop - they can't make your sandwich until you tell them what ingredients you want.

The POST endpoint is waiting for someone to contact it with specific parameters (like {"jobTitle": "frontend developer", "location": "remote"}), but without that data, it can't do anything useful nor display anything.

### GitHub Package Installation Warnings
When installing a project from GitHub through the terminal, sometimes you might get yellow warnings about other packages being uninstalled. This means that the program uses a different (likely more updated) version of those programs, so it is uninstalling them for you and reinstalling the correct version. You do not have to do anything about these warnings.

### Python Package Installation and Location
Python installs packages globally (or in your Python environment) in a central location on your system. The packages are stored in Python's site-packages directory, not in your project folder. Based on your earlier installation output, packages are installed in: C:\\Users\\migue\\AppData\\Roaming\\Python\\Python312\\Scripts.

You can find if a package/program has been properly installed by running this command in your terminal:

```
pip list | findstr name-of-package
```

### Creating New Git Branches
To create a new branch both locally and on your GitHub repo, use the following command on the terminal:

```
git checkout -b your-branch-name
```

And then click on 'Publish Branch' in the Source Control panel.

---

## Astro.js

### Cloudflare Custom Domain Configuration
When creating a site with Cloudflare and assigning a custom domain, make sure that you uncheck the 'Proxy status' on the CNAME record. so the custom-domain.example.com CNAME example.pages.dev is set to unproxied (turning the orange cloud to gray). What this does is bypassing Cloudflare's proxy service for that specific record and create a direct connection between your custom domain and the Cloudflare Pages subdomain, eliminating the extra hop.

---

## Miscellaneous

### CORS (Cross-Origin Resource Sharing)
CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that controls how web pages in one domain can request resources from another domain. It's essentially a set of rules that browsers enforce to prevent potentially malicious websites from accessing data across different origins without permission.

When a web application tries to make a request to a server on a different domain (a "cross-origin request"), the browser first checks if that server has explicitly allowed such requests. If not, the browser blocks the request entirely to protect users from potential security vulnerabilities.

In the context of your chat app, think of CORS like international mail delivery:

1. Your Vue app (in country A) wants to send a letter to the Anthropic API (in country B)
2. Due to security concerns, you use a trusted intermediary (your Worker) in country C
3. The security rules require that any mail coming from country C must have specific customs declarations (the CORS headers in the response body and the catch statement)
4. If these declarations are missing, the mail is returned without being delivered, even if the contents were perfectly legitimate

The CORS headers are those customs declarations that must be included with every piece of mail (response), whether it contains good news or bad news.

Without CORS, any website could potentially:

- Make requests to your bank's API using your logged-in credentials
- Fetch private data from services where you're authenticated
- Send requests that might modify data on other domains

CORS was created to allow legitimate cross-origin communication while preventing these security risks. It works by requiring servers to explicitly declare which origins can access their resources, what HTTP methods can be used, and what headers can be included.