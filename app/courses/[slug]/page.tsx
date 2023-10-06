export const revalidate = 1200;

// UTILS
import { getFirestoreData } from "@/utils/admingFirebase";

interface Props {
  params: { slug: string };
}

export const generateStaticParams = async ({ params }: Props) => {
  const data = await getFirestoreData();
  const paths = data?.map((doc) => ({
    params: { slug: doc.slug },
  }));

  return paths;
}


export default async function CoursesPage(props: Props) { 
  // FETCH DATA
  const data = await getFirestoreData();
  return (
    <div>
    <h1>These are part of the courses page {props.params.slug}</h1>
    {data && data.map(doc => (<h1>We got data from firestore {doc.content}</h1>))}
  </div>
  )
}

