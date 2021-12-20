import React, {useState} from 'react'

const Movies=()=>{
    const [title, setTitle]=useState("")
    const [year, setYear]=useState("")
    const [poster, setPoster]=useState("")
    const [imdbID, setImdbID]=useState("")
    let totalResults;

    const fetchData= async (url)=>{
        console.log("URL: "+url)
        const responce=await fetch(url)
        const data=await responce.json()
        return data
    }

    const getMovies=async (query)=>{
        const API_KEY='9ec6f531'
        const i='tt3896198' // a valid IMDB ID
        let url=`http://www.omdbapi.com/?i=${i}&apikey=${API_KEY}`

        const arr=query.split(' ')
        query=""
        // removing spaces between search query items
        for(let i=0; i<arr.length; i++)
            query+=arr[i]
        url+=`&s=${query}`

        const data= await fetchData(url)

        if(data['Response']==="False"){
            document.getElementById('error').innerHTML=data['Error']
            document.getElementById("result").style.display="none"
            document.getElementById("error").style.display="block"
        }

        if(data['Response']==="True"){
            document.getElementById("error").style.display="none"
            document.getElementById("result").style.display="block"
            console.log(data)
            totalResults=data['totalResults']

            const n=data['Search'][0]['Title']
            setTitle(n)

            const p=data['Search'][0]['Poster']
            setPoster(p)

            const yr=data['Search'][0]['Year']
            setYear(yr)
            const id=data['Search'][0]['imdbID']
            setImdbID(id)
        }
    }

    const getName=()=>{
        const name=document.getElementById('name').value
        getMovies(name) // getMovies(name)
    }

    window.onload=()=>{
        document.getElementById('name').addEventListener('click', (event)=>{
            event.preventDefault()
            const key=event.keyCode
            console.log(event.keyCode)
            if(key===13){  // ENTER pressed
                document.getElementById('btn').click()
            }
        })
        document.getElementById('result').style.display="none"
    }

    const imgStyle={
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    }

    return (
        <>
            <div className="container">
                <form className="my-3">
                    <div className="row">
                        <div className="col-lg-10 col-md-12 col-sm-12">
                            <input className="form-control" id="name" type="text" placeholder="Enter movie name" />
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <button id="btn" onClick={getName} className="btn btn-outline-primary" type="button"> Search </button>
                        </div>
                    </div>
                </form>

                <div className="container my-5">
                    <h2 id="error" className="text-center" ></h2>

                </div>

                <div className="container" id="result">
                    {/* <h6 className="text-center"> {title} </h6>
                    <h6 className="text-center">{year} </h6>
                    <h6 className="text-center">{imdbID} </h6> */}
                    <img src={poster} alt="Poster" style={imgStyle} />
                </div>
            </div>
        </>
    )
}

export default Movies