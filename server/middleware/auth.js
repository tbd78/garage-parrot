const crypto = require('crypto');
const passport = require("passport");
const router = require('express').Router();
const localStrategy = require("passport-local");
const { GetUserByEmail } = require("../db/query/select");
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const path = require("path");

passport.use(new localStrategy(async (email, password, cb) => {
    const user = await GetUserByEmail(email);

    // Erreur a laisser si la requête de l'utlisateur n'a pas abouti
    if (user.id === undefined) {
        let error = "impossible de s'authentifier. Contacter l'administrateur du site!"
        return cb(error);
    }

    // Message a laisser si l'email ne correspond pas
    if(!user) {
        return cb(null, false, "nom d'utilisateur ou mot de passe incorrect");
    }
    //Message a laisser si le mot de passe ne correspond pas
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if(err) {
            console.log("erreur d'authentification : ", err);
            return cb(err);
        }

        if(!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return cb(null, false, "nom d'utilisateur ou mot de passe incorrect");
        }

        return cb(null, user);
    });
}))

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, {
            id: user.id,
            role: user.role,
            email: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.get("/", (req, res) => {
    // si déjà connecté => rediriger vers la page adéquate
    if(req.user) {
        switch (req.user.role) {
            case "admin":
                res.redirect("/back-office/admin");
                break;
            case "employee":
                res.redirect("/back-office/employee");
                break;
        }
    }

    res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

router.get("/redirect-user", ensureLogIn({redirectTo: '/auth'}), (req, res) => {
    console.log("[auth] user: ", req.user);
    // si nous dans le cas où l'utilisateur est admin => rediriger vers admin
    switch(req.user.role) {
        case "admin":
            res.redirect("/back-office/admin");
            break;
        case "employee":
            res.redirect("/back-office/employee");
            break;
        default:
            res.redirect("/");
    }
});

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/auth/redirect-user',
    failureRedirect: '/auth',
    failureMessage: true,
    keepSessionInfo: true
}));

router.post('/logout', ensureLogIn({redirectTo: '/auth'}), function(req, res, next) {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/auth');
    });
});

router.all('*', (req, res) => {
    res.redirect('/auth');
});

module.exports = router
