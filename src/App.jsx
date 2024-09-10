import {React, useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = '7sPaMCIcRqJ5PdO6UiLUJj5Ta6x79srW3FFLoPUI'
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`

      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }
      localStorage.clear()

      try {
        const response = await fetch(url)
        const apiData = await response.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')

      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, []) //Listens to particular events in our app - if dependency list contains nothing - run the function when page loads - else gets executed only when variable changes

  return (
    <>   
  {data ? (<Main data = {data}/>) : (
    <div className = "loadingState">
      <i className="fa-solid fa-spinner"></i>
    </div>
  )}
    {showModal && (<Sidebar data = {data} showModal = {showModal} handleToggleModal = {handleToggleModal}/> )}
{data && ( <Footer data = {data} showModal = {showModal} handleToggleModal = {handleToggleModal} />
)}    </>
  )

}

export default App
