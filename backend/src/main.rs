#[macro_use] extern crate rocket;
extern crate dotenv;

use rocket::serde::{Deserialize, json::Json};
use lettre::message::header::ContentType;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use lettre::transport::smtp::client::{Tls, TlsParameters};
use rocket::fs::{FileServer, NamedFile};
use std::path::Path;
use dotenv::dotenv;
use std::env;

const SENDER_EMAIL: &str = "admin@slawomir-wozniak.pl";
const MY_EMAIL: &str = "contact@slawomir-wozniak.pl";
const MY_EMAIL_SIGNATURE: &str = "Slawomir Wozniak <contact@slawomir-wozniak.pl>";

pub struct CORS;
#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Attaching CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[options("/<_..>")]
fn all_options() {
    /* Intentionally left empty */
}

#[get("/<_..>", rank = 15)]
async fn fallback_url() -> Option<NamedFile>{
    print!("Falling back to index.html");
    NamedFile::open(Path::new("/bin/server/static/index.html")).await.ok()
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct EmailData<'r> {
    email: &'r str,
    phone_number: &'r str,
    message: &'r str,
    name: &'r str,
    surname: &'r str,
}

#[post("/send-email", data = "<email_data>")]
fn send_email(email_data: Json<EmailData>) {
    let email = Message::builder()
        .from(SENDER_EMAIL.parse().unwrap())
        .reply_to(email_data.email.parse().unwrap())
        .to(MY_EMAIL_SIGNATURE.parse().unwrap())
        .subject(format!("New message from website from: {} {}", email_data.name, email_data.surname))
        .header(ContentType::TEXT_PLAIN)
        .body(format!("Phone number: {}\nEmail: {}\n\n{}", email_data.phone_number, email_data.email, email_data.message))
        .unwrap();
    let creds = Credentials::new(MY_EMAIL.to_owned(), env!("SMTP_PASSWORD").to_owned());

    let mailer = SmtpTransport::relay(env!("SMTP_HOST"))
    .unwrap()
    .tls(Tls::Required(TlsParameters::builder(env!("SMTP_HOST").to_string()).build().unwrap()))
    .port(587)
    .credentials(creds)
    .build();

    match mailer.send(&email) {
        Ok(_) => println!("Email sent successfully!"),
        Err(e) => panic!("Could not send email: {e:?}"),
    }
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();
    rocket::build().attach(CORS)
    .mount("/", routes![send_email, all_options, fallback_url])
    .mount("/static", FileServer::from("/bin/server/static")) 
}
