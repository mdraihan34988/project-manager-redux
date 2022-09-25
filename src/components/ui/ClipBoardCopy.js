import React, { useState } from 'react'

function ClipBoardCopy({copyText}) {
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    const handleCopyClick = () => {

      copyTextToClipboard(copyText)
        .then(() => {

          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      <>
        <input type="text" value={copyText} readOnly hidden/>
        <button onClick={handleCopyClick} type="button">
          <span>{isCopied ? <span className='text-green-900 text-sm'>Copied!</span> : <svg className="h-5 w-5 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="8" y="8" width="12" height="12" rx="2" />  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>}</span>
        </button>
      </>
    );
}

export default ClipBoardCopy