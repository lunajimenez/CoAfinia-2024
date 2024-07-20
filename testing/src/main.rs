#[macro_use] extern crate rocket;

use rocket::fs::FileServer;
use rocket::fs::NamedFile;
use std::path::{Path, PathBuf};

#[get("/zip")]
async fn download_zip() -> Option<NamedFile> {
    let file_path = Path::new("zip.rar");
    NamedFile::open(PathBuf::from(file_path)).await.ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", FileServer::from("."))
        .mount("/", routes![download_zip])
}

