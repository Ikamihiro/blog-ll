import Layout from '../components/Layout';
import BlogList from '../components/BlogList';
import matter from 'gray-matter';

const Index = props => {
  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}>
      <section>
        <BlogList allBlogs={props.allBlogs} />
      </section>
    </Layout>
  );
}

Index.getInitialProps = async function () {
  const siteConfig = await import(`../data/config.json`);
  const posts = (context => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key, index) => {
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');
      const value = values[index];
      const document = matter(value.default);
      return {
        document,
        slug,
      };
    });
    return data;
  })(require.context('../posts', true, /\.md$/));

  return {
    allBlogs: posts,
    ...siteConfig,
  };
}

export default Index;

// export async function getStaticProps() {
//   const configData = await import(`../data/config.json`)
//   return {
//     props: {
//       title: configData.title,
//       description: configData.description,
//     },
//   };
// }
