import React, {useContext, useMemo, useRef, useState} from 'react';
import cl from './MySelect.module.css';

const MySelect = ({options, defaultValue, value, onChange}) => {
  const [visibleSort, setVisibleSort] = useState(defaultValue);
  let option, cacheOption

  const fakeSelectHandler = (event) => {
    console.log('fakeSelectHandler');
    if (isSelectBlocked) return;
    if (event.currentTarget.classList.contains(cl.fakeSelectIsOpen)) {
      // event.currentTarget.classList.remove(cl.fakeSelectIsOpen)
      option = null;
    } else {
      event.currentTarget.classList.add(cl.fakeSelectIsOpen);
    }
  }

  let isSelectBlocked = false;

  const blockEventFakeSelect = () => {
    isSelectBlocked = true;
    setTimeout(()=>isSelectBlocked = false, 200);
  }

  const fakeSelectClose = (event) => {
    // console.log('in fakeSelectClose')
    // console.log('event.currentTarget', event.currentTarget)
    // console.log('event.relatedTarget', event.relatedTarget)
    // console.log('event.target', event.target)
    if (event.currentTarget.contains(event.relatedTarget)) return;
    blockEventFakeSelect()
    option = null;
    // event.currentTarget.classList.remove(cl.fakeSelectIsOpen)
  }

  const fakeSelectOpen = (event) => {
    blockEventFakeSelect()
    event.currentTarget.classList.add(cl.fakeSelectIsOpen)
  }

  const fakeSelectNavigationKey = {
    13: true,
    27: true,
    32: true,
    38: true,
    40: true,
  }

  const fakeSelectNavigate = (event) => {
    console.log(event.which)
    if (fakeSelectNavigationKey[event.which] && event.currentTarget.classList.contains(cl.fakeSelectIsOpen)) {
      console.log(event.which)
      if (event.which === 38) {
        option = option ? option.previousElementSibling : event.currentTarget.querySelector(`.fakeOptionSelectable`);
      }
      if (event.which === 40) {
        option = option ? option.nextElementSibling : event.currentTarget.querySelector(`.fakeOptionSelectable`);
      }
      console.log(option)
      if (option && (event.which === 13 || event.which === 32)) {
        console.log(option.textContent)
        fakeOptionHandler(option, option.textContent)
        return
      }

      option && option.classList.contains('fakeOptionSelectable') ? cacheOption = option : option = cacheOption;
      option?.focus();
    }
  }

  const fakeOptionHandler = (target, name) => {
    onChange(target.dataset.value)
    setVisibleSort(name)
  }

  return (
    <div className={cl.selectHolder}>
      <select
          className={cl.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
      >
        <option disabled value="">{defaultValue}</option>
        {options.map(option =>
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
        )}
      </select>

      <ul
        className={cl.fakeSelect}
        onClick={fakeSelectHandler}
        onBlur={fakeSelectClose}
        onFocus={fakeSelectOpen}
        onKeyUp={fakeSelectNavigate}
        tabIndex="0"
      >
        <li className={cl.fakeOption}>{visibleSort}</li>
        <li className={cl.fakeOption}>{defaultValue}</li>
        {options.map(option =>
          <li
            onClick={(e)=>fakeOptionHandler(e.target, option.name)}
            className={`${cl.fakeOption} fakeOptionSelectable`}
            key={option.value}
            data-value={option.value}
            tabIndex="-1"
          >
            {option.name}
          </li>
        )}
      </ul>
    </div>
  );
};

export default MySelect;