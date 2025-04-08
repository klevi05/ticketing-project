import './summary.css';
function Summary(){
    return(
        <div className='tableBox'>
        <table  className="table table-dark tableStyle">
            <thead>
            <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            </tbody>
        </table>
        </div>
    )
}
export default Summary;