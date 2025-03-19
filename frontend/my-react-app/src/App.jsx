import './App.css'

const Button = () => {
  return (
    <div>
      <button className='bg-red-400 ml-5'>login</button>
    </div>
  )
}

function App() {
  return (
      <div className='bg-blue-500 flex justify-center items-center'>
        <div>
          <p>hello world</p>
        </div>

        <Button></Button>
      </div>
  )
}

export default App
