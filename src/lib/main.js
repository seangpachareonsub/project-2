function main() {

  window.onscroll = myFunction

  const header = document.getElementsByClassName('headers')[0]
  const nav = document.getElementsByClassName('nav-news')[0]


  const sticky1 = header.offsetTop
  const sticky2 = nav.offsetTop


  function myFunction() {
    if (window.pageYOffset > sticky1) {
      header.classList.add('sticky')
    } else {
      header.classList.remove('sticky')
    }

    if (window.pageYOffset > sticky2) {
      nav.classList.add('sticky')
    } else {
      nav.classList.remove('sticky')
    }

  }
}


window.addEventListener('DOMContentLoaded', main)