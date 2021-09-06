import React, {useEffect, useState} from 'react';
import './App.css'
//useEffect => basicamente executa a função digitada a baixo
//useState => salva a lista de filmes para exibição =>getHomeList
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {

  const [movieList, setMovielist] = useState([])
  //cria a lista para ser exibida => setMovielist (função que seta a informação)
  //useState inicia com array vazio, react puro
  const [featuredData, setFeaturedData] = useState(null)
useEffect(() => {
  const loadAll = async() => {
    //Pegando lista total
    let list = await Tmdb.getHomeList()
    //console.log(list)
    setMovielist(list)

    //Pegando a Featured
    let originals = list.filter(i=>i.slug === 'originals')
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
    let chosen = originals[0].items.results[randomChosen]
    //console.log(chosen)
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
    //console.log(chosenInfo)
    setFeaturedData(chosenInfo)

  }

  loadAll()

}, [])

  return (
    <div className="page">
      <Header/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}