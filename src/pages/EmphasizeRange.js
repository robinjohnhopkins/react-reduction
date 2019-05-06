import React from 'react';

const EmphasizeRange = (props) => {
  return (
    <table>
        <tbody>
        <tr>
            <td>
                <span>Emphasize Lower Range</span>
            </td>
            <td>
                <input name="exponent" onChange={props.onChange} type="range" min=".1" max="5" 
                  value={props.value} step=".1" className="slider" id="myRange"/>
            </td>
            <td>
                <span>Emphasize Upper Range</span>
            </td>
        </tr>
        </tbody>
    </table>
  );
};

export default EmphasizeRange;
