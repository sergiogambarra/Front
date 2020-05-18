import React from 'react';
export const  Loading = ()=> {
   return(
        <div style={{ minHeight: '300px' }} className="d-flex justify-content-center align-items-center text-primary">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
   )
}