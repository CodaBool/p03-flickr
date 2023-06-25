import axios from "axios"
import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Spinner from "react-bootstrap/Spinner"
import Navigation from "../components/Navigation"

export default function index() {
  const [photos, setPhotos] = useState(null)
  const [loading, setLoading] = useState(null)
  const [tags, setTags] = useState('animal,nature')

  useEffect(() => {
    setLoading(true)
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&safe_search=1&per_page=20&tags=${tags}&api_key=${process.env.NEXT_PUBLIC_KEY}`)
      .then(res => {
        const removedFront = res.data.substring(14, res.data.length)
        const removedBack = removedFront.substring(0, removedFront.length - 1)
        setPhotos(JSON.parse(removedBack).photos.photo)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [tags])

  return (
    <>
      <Navigation setTags={setTags} />
      {photos
        ? photos.map(photo => (
            <Card key={photo.id} className="my-5">
              <Card.Img variant="top" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
              <Card.Body>
                <Card.Title>{photo.title}</Card.Title>
              </Card.Body>
            </Card>
          ))
        : loading
            ? <div className="d-flex">
                <Spinner animation="border" variant="primary" className="mx-auto" />
              </div>
            : <h1 className="mt-5 display-3 fadeIn">No Photos</h1>
      }
    </>
  )
}