export default {

  slugify(text) {
    return text.toString().toLowerCase().trim()
      .replace(/&/g, '-and-')
      .replace(/[\s\W-]+/g, '-') 
  }
}


