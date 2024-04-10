export const heroQuery = `... on SectionHero{
  sys{
    id
  }
  position
  component
  titleHero
  subtext
  buttonText
  buttonLink
  scrollDownText
  sys {
    id
  }
  pointsCollection (limit:3){
    items {
      title
    }
  
  }
 
}
`
