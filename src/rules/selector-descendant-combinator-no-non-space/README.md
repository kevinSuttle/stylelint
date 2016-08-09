# selector-descendant-combinator-no-non-space

Disable non-spaces characters of the descendant combinator in descendant selectors.

```css
   .selector1 .selector2 .selector3 { color: pink; }
/**          ↑          ↑
 * These are descendant combinators */
```

## Options

### `true`

The following patterns are considered warnings:

```css
.selector1 
.selector2 {}
```

The following patterns are *not* considered warnings:

```css
.selector1 .selector2 {}
```

```css
.selector1  .selector2 {}
```
