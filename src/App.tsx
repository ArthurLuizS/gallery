import * as C from './styles'
import {useState, useEffect} from 'react'
import * as Photos from './services/photo'
import {Photo} from './types/photo'

const App = () =>{
  const [loading, setLoading] = useState(false)
  const [photos, SetPhotos] = useState<Photo[]>([]);

  useEffect(()=>{
    const getPhotos = async () =>{
      setLoading(true);
      SetPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, [])

  return (
    <C.Container> 
        <C.Area>
          <C.Header> Galeria de fotos </C.Header>


          {/* Area de upload */}


          {/* Lista das Fotos */}

          {loading &&
            <C.ScreenWarning> 
              <div className="emoji"> 🧙 ⌛ </div>
              <div> Carregando....</div>
            </C.ScreenWarning>
          }

          {!loading && photos.length > 0 &&
            <C.PhotoList>
              {photos.map((item, index) =>(
                <div> {item.name} </div>
              ))}
            </C.PhotoList>
          } 
          {!loading && photos.length === 0 &&
             <C.ScreenWarning> 
              <div className="emoji"> 🤷‍♂️  </div>
              <div> Ainda nao há fotos cadastradas...</div>
           </C.ScreenWarning>
          }
        </C.Area>
    </C.Container>
  );
}

export default App;