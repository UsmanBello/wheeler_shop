import './MySelect.css'


const MySelect=({selectedValue, handleSelectValue, selectOptions, styleClass})=>{

    return (
    <>
    <select className={styleClass ? styleClass : "my__select__input"} value={selectedValue} onChange={(e)=>handleSelectValue(e.target.value)}>
           { selectOptions.map((option, index)=>{
               return <option value={option.key1} key={index}>{option.key2}</option>}) }
    </select>
    </>
    )
}

export default MySelect