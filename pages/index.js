import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Index = (props) => (
  <div>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href="/draw"><a>Draw</a></Link></li>
    </ul>
    <h1>Notes</h1>
    <form>
      <label>
        Title:
        <input type="text" name="title" />
      </label>
      <label>
        Notes:
        <input type="text" name="notes" />
      </label>
      <button onClick={this.handleAdd}
    </form>
  </div>
);

Index.getInitialProps = async function()
{
  try{
    const protocol = req.headers
  }
}

Index.constructor(props)
{
  super(props);
  this.state = {title: '', notes: props.notes};
}

Index.handleChange(event)
{
  this.setState({name: event.target.value});
}

export default Index;
