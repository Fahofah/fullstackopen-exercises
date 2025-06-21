const NewPersonForm = ({onSubmit, nameValue, numberValue, nameChangeHandler, numberChangeHandler}) => {
  return (
    <div> 
      <h2>Add a new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={nameChangeHandler}/>
        </div>
        <div>
          number: <input value={numberValue} onChange={numberChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default NewPersonForm