import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function BlogList(props) {
  function truncateSummary(content) {
    return content.slice(0, 200).trimEnd();
  }

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4);
  }

  console.log(props.allBlogs);

  return (
    <div>
      <ul className='list'>
        {props.allBlogs.length >= 1 && props.allBlogs.map(post => (
          <Link key={post.slug} href={{ pathname: `/blog/${post.slug}` }}>
            <a>
              <li>
                <div className='hero_image'></div>
                <div className='blog__info'>
                  <h2>{post.document.data.title}</h2>
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};
