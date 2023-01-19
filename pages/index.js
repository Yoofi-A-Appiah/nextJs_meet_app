import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
//import { useEffect, useState } from "react";


function HomePage(props) {
  //const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //some http request
  //   setLoadedMeetups(DummyMeetups);
  // }, []);
  return <><Head>
      <title>React Meetups</title>
      <meta name="description" content="Browse a large list of meetups"></meta>
    </Head><MeetupList meetups={props.meetups} /> </>;
}
// static generation that only runs in on server and not during build step like getStaticProps
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       meetups: DummyMeetups,
//     },
//   };
// }
//acts as a server side rendering for api to ensure that all fetching is done prior to them being loaded

export async function getStaticProps() {
  //some api fetch call
  const client = await MongoClient.connect(
    "mongodb+srv://yoofi_a:atomsgadget@cluster0.amaxj2t.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup =>({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
