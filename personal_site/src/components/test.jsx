import { forwardRef } from "react";

function Test({ text }, innerRef) {
    return (
        <div ref={innerRef}>
            {text}
        </div>
    )

}

export default forwardRef(Test);