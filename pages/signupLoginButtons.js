import {signupOrLogin} from '../methods/signupOrLogin';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  return (
    <>
      <button onClick={() => {
        signupOrLogin('login')
          .then((result) => {
            if (result) {
              router.push('/calendar');
            }
        });
      }}>login</button>
      <button onClick={() => {
        signupOrLogin('signup')
          .then((result) => {
            if (result) {
              router.push('/calendar');
            }
        });
      }}>signup</button>
    </>
  );
}
