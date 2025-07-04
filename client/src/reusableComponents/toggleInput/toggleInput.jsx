import { useState,useRef,useEffect} from "react";

import "./toggleInput.css"

import { useTranslation } from "react-i18next";



export const ToggleInput = ({svg,name,inputText,loaderText,handleChange,namespace,errorText,onClick}) => {
    const [isHidden, setIsHidden] = useState(false);

    const {t} = useTranslation(namespace)

  
    const handleClick = () => {
      setIsHidden(prev => !prev);
    };

    const inputRef = useRef(null);

    useEffect(() => {
      if (isHidden && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isHidden]);

  
    return (
      <div className="toggle-container">
        {svg}
        <div className="textContainer">
          {!isHidden ? (
            <>

    
              <span className="toggle-span">{t(name)} {svg!=null?":":""}</span>
              <span className="toggle-span">{loaderText}</span>
            </>
          ) : (
              <input
                  ref={inputRef}
                  type="text" 
                  className="toggle-input" 
                  name={name} 
                  onChange={handleChange} 
                  value={inputText} 
                  onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleClick(); 
                    if (isHidden && loaderText!=inputText) {
                      onClick(e); 
                    }
                  }}}
              />
          )}

          { (errorText.length!=0 || true) && <p className="error">{errorText}</p>}
        </div>
  
        <button
         onClick={(ev)=>{
          handleClick();

          if (isHidden && loaderText!=inputText) {
            onClick(ev)
          }
            }}
          className="toggle-button"
        >

          {

            !isHidden?
            < svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="currentColor" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" className="clr-i-outline clr-i-outline-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" className="tick" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m5 14l3.5 3.5L19 6.5" color="currentColor"></path></svg>
          }
        

        </button>
      </div>
    );
  };
  