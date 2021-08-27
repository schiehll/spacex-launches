import Head from "next/head";
import getVideoId from "get-video-id";
import { ApolloClient, ApolloError, InMemoryCache, gql } from "@apollo/client";
import { Container } from "@chakra-ui/react";
import ErrorMessage from "components/ErrorMessage";
import LaunchesList, { Launch } from "components/LaunchesList";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query GetLaunches {
          launchesPast(limit: 20) {
            id
            launch_date_local
            mission_name
            launch_site {
              site_name_long
            }
            links {
              video_link
            }
            rocket {
              rocket_name
            }
          }
        }
      `,
    });

    return {
      props: {
        launches: data.launchesPast.map((launch: Launch) => {
          return {
            ...launch,
            thumbnail: `https://img.youtube.com/vi/${
              getVideoId(launch.links.video_link).id
            }/hqdefault.jpg`,
          };
        }),
      },
    };
  } catch (error) {
    return {
      props: {
        errorMessage: (error as ApolloError | Error)?.message as string,
        launches: [],
      },
    };
  }
}

type Props = {
  launches: Launch[];
  errorMessage: string;
};

export default function Home({ launches, errorMessage }: Props) {
  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <>
      <Head>
        <title>SpaceX Launches</title>
        <meta name="description" content="SpaceX Launches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="1400px">
        <LaunchesList launches={launches} />
      </Container>
    </>
  );
}
