import Head from 'next/head';

interface IMetaTitle {
  title?: string;
  description?: string;
  showDefaultTags?: boolean;
}

const MetaTitle = ({
  showDefaultTags = false,
  title = `One of The UK's Leading Mortgage Brokers`,
  description = 'Direct Mortgages has been committed to providing the best service & advice since 1989. Our team of advisors will guide you through the application.',
}: IMetaTitle) => (
  <>
    <Head>
      {/* Title */}
      <title>{`${title} - Direct Mortgages`}</title>
      <meta name="title" content={`${title} - Direct Mortgages`} />
      <meta property="og:title" content={`${title} - Direct Mortgages`} key="title" />
      <meta name="twitter:title" content={`${title} - Direct Mortgages`} key="title" />

      {/* Description */}
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      {showDefaultTags && (
        <>
          {/* Favicon */}
          <link
            rel="shortcut icon"
            href="https://direct2mortgages.co.uk/wp-content/uploads/2018/04/small-icon.png"
          />

          {/* Author Meta */}
          <meta name="author" content="Direct Mortgages" />

          {/* FACEBOOK */}
          <meta property="og:locale" content="en_GB" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Direct Mortgages" />
          <meta property="og:url" content="https://direct2mortgages.co.uk/" />
          {/* <meta property="og:image" content="" /> */}

          {/* TWITTER */}
          <meta name="twitter:site" content="@direct2mortgages" />
          <meta name="twitter:url" content="https://direct2mortgages.co.uk/" />
          <meta name="twitter:card" content="summary_large_image" />
          {/* <meta name="twitter:image" content="" /> */}

          {/* Keywords */}
          <meta name="keywords" content="Direct Mortgages" />
        </>
      )}
    </Head>
  </>
);

export default MetaTitle;
