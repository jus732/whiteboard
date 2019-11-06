import Link from 'next/link';

const Draw = () => (
  <div>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href="/draw"><a>Draw</a></Link></li>
    </ul>
    <h1>Hello Draw</h1>
    <p>hi there</p>
  </div>
);

export default Draw;
