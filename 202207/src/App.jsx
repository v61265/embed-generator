import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([
    {
      id: '',
      title: '',
      img: '',
      code: '',
    }
  ])

  const [code, setCode] = useState('')

  function handleChangeInput(value, index, label) {
    let newData = [...data]
    newData[index][label] = value
    setData(newData)
  }
  
  function handleClickAdd(e) {
    e.preventDefault()
    setData([...data, {
      id: '',
      title: '',
      img: '',
      code: '',
    }])
  }

  function handleSubmit(e) {
    e.preventDefault()
    let newCode = `<body> <ul class='toc'>`
    data.forEach(item => {
      newCode += `<li class='item'>
      <a class='item__link' href='#${item.id}'>
          <img src='${item.img}' class='item__img'/>
          <span class='item__name'>${item.title}</span>
      </a>
  </li>`
    })
    newCode += `</ul>
    <style>
        .toc {
            list-style: none;
            padding: 25px 0;
            border-top: 2px solid #000928;
            border-bottom: 2px solid #000928;
        }

        .item + .item {
            margin-top: 16px;
        }

        .item__link {
            display: flex;
            align-items: center;
        }

        .item__img {
            max-width: 129px;
        }

        .item__name {
            font-weight: 700;
            font-size: 16px;
            line-height: 23px;
            letter-spacing: 0.03em;
            color: #000928;
            margin-left: 16px;
        }
        @media (min-width: 768px) {
            .toc {
                display: flex;
                flex-wrap: wrap;
            }
            .item {
                width: calc(50% - 20px);
            }
            .item + .item {
                margin-top: 0;
            }
            .item:nth-child(2n) {
                margin-left: 40px;
            }

            .item:nth-child(n+3) {
                margin-top:20px;
            }
        }
    </style>
</body>`
    setCode(newCode)
  }

  return (
    <div className="App">
      <h1>文中索引產生器</h1>
      <form>
      <button onClick={handleClickAdd}>新增一筆資料</button>
      {
        data.map((item, index) => {
          return (<div key={index} className='item'>
            <p>id：<input type='text' value={item.id} onChange={(e) => handleChangeInput(e.target.value, index, 'id')}/></p>
            <p>標題：<input type='text' value={item.title} onChange={(e) => handleChangeInput(e.target.value, index, 'title')}/></p>
            <p>圖片網址：<input type='text' value={item.img} onChange={(e) => handleChangeInput(e.target.value, index, 'img')}/></p>
            <p>embeded code：<br/><textarea value={item.code} onChange={(e) => handleChangeInput(e.target.value, index, 'code')}/></p>
          </div>)
        })
      }
      <button onClick={handleSubmit}>產生 embeded code</button>
      </form>
      {code && <div className='code'>{code}</div>}
    </div>
  )
}

export default App
