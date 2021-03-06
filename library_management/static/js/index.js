$(() => {
    const token = window.localStorage.getItem("Authorization");
    console.log({ token });
    if (token) {
        $("#login-signup-link").hide();
        $("#btn-logout").show();
    } else {
        $("#btn-logout").hide();
        $("#login-signup-link").show();
    }

    loadBooks();
});

$("#btn-logout").on('click', logout);

function logout() {
    console.log("Inside Logout!");
    window.localStorage.removeItem("Authorization");
    // window.location.href = "/login-signup";
    window.location.reload();
}

function loadBooks() {
    $.ajax({
        type: "GET",
        url: "/api/v1/book/",
        success: function (result, status, xhr) {
            console.log(result);
            console.log(status);
            console.log(xhr);
            const response = xhr.responseJSON["results"];

            for (let index = 0; index < response.length; index++) {
                const oBook = response[index];
                
                const token = window.localStorage.getItem("Authorization");
                if (token) {
                    let sBookDetails = `<article>
                    <div class="single-book-box">
                        <div class="post-thumbnail">
                            <div class="book-list-icon "></div>
                            <a href="#"><img alt="Book"
                                    src=${oBook.image} /></a>
                        </div>
                        <div class="post-detail">
                            
                            <header class="entry-header">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h3 class="entry-title">
                                            <a href="#"> ${oBook.title} </a>
                                        </h3>
                                        <ul>
                                            <li><strong>Author:</strong> ${oBook.author}</li>
                                        </ul>
                                    </div>
                                    <div class="col-sm-6">
                                        <ul>
                                            <li><strong>Publish Date: </strong>${oBook.published_date}</li>
                                        </ul>
                                    </div>
                                </div>
                            </header>
                            <div class="entry-content">
                                <p>${oBook.description}</p>
                            </div>
                            <footer class="entry-footer">
                                <a class="btn btn-dark-gray" href="#">Update</a>
                                <a class="btn btn-dark-gray" href="#">Delete</a>
                            </footer>
                        </div>
                        <div class="clear"></div>
                    </div>
                </article>`;
                $("#book-list").append(sBookDetails);
                } else {
                    let sBookDetails = `<article>
                    <div class="single-book-box">
                        <div class="post-thumbnail">
                            
                            <a href="#"><img alt="Book"
                                    src=${oBook.image} /></a>
                        </div>
                        <div class="post-detail">
                            
                            <header class="entry-header">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h3 class="entry-title">
                                            <a href="#"> ${oBook.title} </a>
                                        </h3>
                                        <ul>
                                            <li><strong>Author:</strong> ${oBook.author}</li>
                                        </ul>
                                    </div>
                                    <div class="col-sm-6">
                                        <ul>
                                            <li><strong>Publish Date: </strong>${oBook.published_date}</li>
                                        </ul>
                                    </div>
                                </div>
                            </header>
                            <div class="entry-content">
                                <p>${oBook.description}</p>
                            </div>

                        </div>
                        <div class="clear"></div>
                    </div>
                </article>`;
                $("#book-list").append(sBookDetails);
                }

            }

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}