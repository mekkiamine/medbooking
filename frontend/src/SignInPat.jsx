import React from 'react';
import './signin.css';
export const SignInPat = () => {
    
    return (
       <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous"
      />
      <body>
        <section className="login">
          <div className="login_box">
            <div className="left">
              <div className="top_link">
                <h3>Welcome To MedBooking</h3>
              </div>
              <div className="contact">
                <form action="">
                  <h3>SIGN IN</h3>
                  <input type="text" placeholder="Nom et Prénom" />
                        <input type="password" placeholder="PASSWORD" />
                        <input type="email" placeholder="EMAIL" />
                        <input type="text" placeholder="ADDRESS" />
                        <input type="tel" placeholder="PHONE NUMBER" />
                        <input type="text" placeholder="CITY" />
                  <button className="submit">LET'S GO</button>
                </form>
              </div>
            </div>
            <div className="right">
              <div className="right-text">
                <h2>LONYX</h2>
                <h5>A UX BASED CREATIVE AGENCY</h5>
              </div>
              <div className="right-inductor">
                <img
                  src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </body>
    </>
    );
  };
  