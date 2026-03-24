# Component Pattern Library

## Project Card Patterns

### The Clean Row
```tsx
// Minimal horizontal row — title, type, year aligned on a baseline
<Flex justify="space-between" align="baseline" py="3" borderBottom="1px solid" borderColor="border">
  <a href={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
    <Box fontSize="base" fontWeight="medium" color="text">{project.title}</Box>
  </a>
  <Flex gap="4" fontSize="xs" color="text.dim">
    <span>{project.type}</span>
    <span>{project.year}</span>
  </Flex>
</Flex>
```

### The Stacked Card
```tsx
// Vertical card with breathing room — title prominent, meta below
<Box p="5" background="bg.card" borderRadius="8px" border="1px solid" borderColor="border">
  <Box fontSize="xs" fontWeight="bold" color="accent" letterSpacing="wide" textTransform="uppercase" mb="2">
    {project.type}
  </Box>
  <a href={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
    <Box fontSize="lg" fontWeight="bold" color="text" lineHeight="tight" mb="3">
      {project.title}
    </Box>
  </a>
  <Box fontSize="sm" color="text.dim">{project.year}</Box>
</Box>
```

### The Hero Feature
```tsx
// Full-width featured project — bold, dominant, one item
<Box py="12" borderBottom="1px solid" borderColor="border">
  <Box fontSize="xs" fontWeight="bold" color="accent" letterSpacing="widest" textTransform="uppercase" mb="4">
    Featured
  </Box>
  <a href={project.liveUrl || project.externalUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <Box fontSize="2xl" fontWeight="bold" color="text" lineHeight="tight" mb="4">
      {project.title}
    </Box>
  </a>
  <Box fontSize="md" color="text.mid" lineHeight="normal" maxW="600px">
    {project.problem}
  </Box>
</Box>
```

## Section Header Pattern
```tsx
// Uppercase mono label with optional rule line
<Flex align="center" gap="4" mb="6">
  <Box fontSize="xs" fontWeight="bold" color="text.dim" letterSpacing="widest" textTransform="uppercase" fontFamily="mono">
    {label}
  </Box>
  <Box flex="1" height="1px" background="border" />
</Flex>
```

## Timeline Pattern
```tsx
// Year-grouped timeline entries
<VStack gap="0" align="stretch">
  {entries.map(entry => (
    <Flex key={entry.year + entry.company} gap="6" py="4" borderBottom="1px solid" borderColor="border">
      <Box fontSize="sm" fontFamily="mono" color="text.dim" minW="50px" flexShrink={0}>
        {entry.year}
      </Box>
      <Box flex="1">
        <Box fontSize="base" fontWeight="medium" color="text">{entry.role}</Box>
        <Box fontSize="sm" color="text.mid">{entry.company}</Box>
        <Box fontSize="sm" color="text.dim" mt="1" lineHeight="normal">{entry.description}</Box>
      </Box>
    </Flex>
  ))}
</VStack>
```

## Navigation Pattern
```tsx
// Vertical nav for sidebar
<VStack gap="1" align="stretch">
  <a href="/" style={{ textDecoration: 'none' }}>
    <Box px="3" py="2" fontSize="sm" color="text.mid" borderRadius="4px" _hover={{ background: 'bg.tint', color: 'text' }}>
      Home
    </Box>
  </a>
  <a href="/about" style={{ textDecoration: 'none' }}>
    <Box px="3" py="2" fontSize="sm" color="text.mid" borderRadius="4px" _hover={{ background: 'bg.tint', color: 'text' }}>
      About
    </Box>
  </a>
</VStack>

// Horizontal nav for top bar
<Flex gap="6" align="center">
  <a href="/" style={{ textDecoration: 'none' }}>
    <Box fontSize="sm" color="text.mid" _hover={{ color: 'text' }}>Home</Box>
  </a>
  <a href="/about" style={{ textDecoration: 'none' }}>
    <Box fontSize="sm" color="text.mid" _hover={{ color: 'text' }}>About</Box>
  </a>
</Flex>
```

## Capabilities / Tags Pattern
```tsx
// Inline tag list with wrapping
<Flex gap="2" flexWrap="wrap">
  {capabilities.map(cap => (
    <Box key={cap} px="3" py="1" fontSize="xs" color="text.dim" background="bg.tint" borderRadius="4px" border="1px solid" borderColor="border">
      {cap}
    </Box>
  ))}
</Flex>
```

## Design Rules for Components

- **Every interactive element needs a hover state.** Links change color or opacity. Cards get a subtle background shift.
- **Use border-bottom for row separators, not border on cards.** It's cleaner and more editorial.
- **Labels (type, year, category) should be significantly smaller than titles.** Use `xs` or `2xs` with `uppercase` and `letterSpacing: 'wide'`.
- **Don't center-align text unless the layout is symmetrical.** Left-align is always safer.
- **Use `color="text.dim"` for de-emphasized content, not low opacity.** Opacity affects borders and backgrounds too.
