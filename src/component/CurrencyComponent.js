import './CurrencyComponent.css'
//นำข้อมูลที่props จาก App.js มาใช้งาน
const CurrencyComponent = (props) => {
    //ดึงข้อมูลมาใช้เอามาทุกตัวที่เราต้องใช้ในการเปลี่ยนแปลงค่า
    const {currencyChoice,selectCurrency,changeCurrency,amount,onChangeAmount} = props
    return(
        <div className="currency"> 
            {/* ช่องให้เลือก */}
            <select value={selectCurrency} onChange={changeCurrency}>
                {/* ดึงข้อมูลมาใช้ทีละตัว */}
                {currencyChoice.map((choice)=>
                    <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            {/* ช่องให้กรอกตัวเลือก */}
            <input 
                type="number" 
                value={amount}
                onChange = {onChangeAmount}
            />
        </div>
    )

}

export default CurrencyComponent