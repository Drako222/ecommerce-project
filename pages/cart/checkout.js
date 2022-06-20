import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { deleteCookie } from '../../util/cookies';
import { getFilmsDatabase } from '../../util/filmsDatabase';

// @media (max-width: 800px) {
//   .row {
//     flex-direction: column-reverse;
//   }
//   .col-25 {
//     margin-bottom: 20px;
//   }
// }

const formStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* @media (max-width: 800px) {
    .row {
      flex-direction: column-reverse;
    }
  }
`; */

const containerStyles = css`
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 800px;
  background-color: #acdf87;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  color: #000c07;
  border-radius: 20px;
  gap: 15px;

  ul {
    list-style: none;
    padding-inline-start: 0px;
    margin-top: 30px;

    li {
      text-align: center;
      color: #000c07;
    }
  }

  h3 {
    margin-bottom: 30px;
  }

  input,
  select {
    width: 100%;
    margin-bottom: 20px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }

  select:focus,
  input:focus {
    outline: none;
    border: 3px solid #a4de02;
  }

  .input--error {
    border-color: red;
  }

  label {
    margin-bottom: 10px;
    display: block;
  }

  .row {
    width: 250px;
  }
`;

const buttonStyles = css`
  cursor: pointer;
  margin-top: 50px;
  border-radius: 20px;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  padding: 14px 21px;
  font-size: 13px;
  line-height: 25px;
  text-transform: uppercase;
  border: solid 3px #a4de02;
  background: #000c07;
  color: white;
  letter-spacing: 3px;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;

  :hover {
    border: solid 3px white;
    background: #a4de02;
    color: #000c07;
  }
`;

export default function Checkout(props) {
  const router = useRouter();

  const totalCounting = props.films.map((film) => {
    const filmPrice = Number(film.price);
    const filmCounter = Number(film.filmCounter);
    const filmPriceTotal = filmPrice * filmCounter;
    return filmPriceTotal;
  });

  // checking today's date
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  let today = year + '-' + month + '-' + day;

  //on delete cookie, only onSubmit
  const handleSubmit = (event) => {
    deleteCookie('cart');
    props.setCart([]);
    event.preventDefault();
    router.push('success/');
  };

  const sum = totalCounting.reduce((accumulator, a) => accumulator + a, 0);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="Please, fill in your information to proceed the checkout"
        />
      </Head>
      <main>
        <h1>Checkout♻️</h1>
        <form css={formStyles} onSubmit={(event) => handleSubmit(event)}>
          <div css={containerStyles}>
            <div className="row">
              <h3>Billing Address</h3>
              <label for="firstname">
                <i class="fa fa-user"></i> First Name
              </label>
              <input
                type="text"
                id="firstname"
                minlength="1"
                maxlength="40"
                name="firstname"
                placeholder="John"
                data-test-id="checkout-first-name"
                pattern="[a-zA-Z]*"
                required
              />
              <label for="surname">
                <i class="fa fa-user"></i> Last Name
              </label>
              <input
                minlength="1"
                maxlength="40"
                type="text"
                pattern="[a-zA-Z]*"
                id="surname"
                name="surname"
                placeholder="Doe"
                data-test-id="checkout-last-name"
                required
              />
              <label for="email">
                <i class="fa fa-envelope"></i> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                data-test-id="checkout-email"
                required
              />
              <label for="adr">
                <i class="fa fa-address-card-o"></i> Address
              </label>
              <input
                type="text"
                id="adr"
                minlength="3"
                maxlength="40"
                name="address"
                placeholder="542 W. 15th Street"
                data-test-id="checkout-address"
                required
              />
              <label for="city">
                <i class="fa fa-institution"></i> City
              </label>
              <input
                type="text"
                minlength="1"
                pattern="[a-zA-Z]*"
                maxlength="20"
                id="city"
                name="city"
                placeholder="New York"
                data-test-id="checkout-city"
                required
              />
              <label for="ZIP">ZIP code</label>
              <input
                type="tel"
                minlength="4"
                maxlength="10"
                pattern="[0-9]+"
                id="ZIP"
                name="ZIP"
                placeholder="68021"
                data-test-id="checkout-postal-code"
                required
              />
              <label for="country">
                <i class="fa fa-country"></i>Country
              </label>
              <select
                id="country"
                name="country"
                class="form-control"
                required
                data-test-id="checkout-country"
              >
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">
                  Bosnia and Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">
                  Cocos (Keeling) Islands
                </option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">
                  Congo, The Democratic Republic of The
                </option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">
                  Falkland Islands (Malvinas)
                </option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">
                  French Southern Territories
                </option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">
                  Heard Island and Mcdonald Islands
                </option>
                <option value="Holy See (Vatican City State)">
                  Holy See (Vatican City State)
                </option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">
                  Iran, Islamic Republic of
                </option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">
                  Korea, Democratic People's Republic of
                </option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">
                  Lao People's Democratic Republic
                </option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">
                  Libyan Arab Jamahiriya
                </option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">
                  Micronesia, Federated States of
                </option>
                <option value="Moldova, Republic of">
                  Moldova, Republic of
                </option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">
                  Netherlands Antilles
                </option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">
                  Northern Mariana Islands
                </option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">
                  Palestinian Territory, Occupied
                </option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">
                  Saint Kitts and Nevis
                </option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">
                  Saint Pierre and Miquelon
                </option>
                <option value="Saint Vincent and The Grenadines">
                  Saint Vincent and The Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">
                  Sao Tome and Principe
                </option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">
                  South Georgia and The South Sandwich Islands
                </option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">
                  Svalbard and Jan Mayen
                </option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">
                  Syrian Arab Republic
                </option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">
                  Tanzania, United Republic of
                </option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">
                  Turks and Caicos Islands
                </option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">
                  Virgin Islands, British
                </option>
                <option value="Virgin Islands, U.S.">
                  Virgin Islands, U.S.
                </option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
            <div className="row">
              <h3>Payment</h3>
              <label for="ccnum">Credit card number</label>
              <input
                id="ccnum"
                type="tel"
                inputmode="numeric"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                name="cardnumber"
                placeholder="1111-2222-3333-4444"
                maxlength="19"
                data-test-id="checkout-credit-card"
                required
              />
              <label for="expmonth">Exp Month</label>
              <input
                type="date"
                id="expmonth"
                name="expmonth"
                min={today}
                placeholder="YYYY-MM-DD"
                data-test-id="checkout-expiration-date"
                required
              />
              <label for="cvv">CVV</label>
              <input
                type="tel"
                id="cvv"
                pattern="[0-9\s]{3,3}"
                name="cvv"
                maxlength="3"
                placeholder="352"
                data-test-id="checkout-security-code"
                required
              />
              <h3>Total price</h3>
              <div>{sum} 💰</div>
              <ul>
                {props.films.map((film) => {
                  return (
                    <li
                      key={`film.id-${film.id}`}
                      data-test-id={`cart-product-${film.id}`}
                    >
                      <p>{film.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <button
            className="button"
            href="success"
            type="submit"
            data-test-id="checkout-confirm-order"
            css={buttonStyles}
          >
            Confirm order
          </button>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const allFilms = await getFilmsDatabase();

  const cookie = context.req.cookies.cart;
  const currentCart = cookie ? JSON.parse(context.req.cookies.cart) : '[]';

  var res = allFilms.filter((n) => currentCart.some((n2) => n.id == n2.id));

  const films = currentCart.map((p) => {
    const cartObject = allFilms.find((prod) => prod.id === p.id);

    return {
      id: cartObject.id,
      title: cartObject.title,
      price: cartObject.price,
      filmCounter: p.filmCounter,
    };
  });

  return {
    props: {
      films,
      currentCart,
    },
  };
}
