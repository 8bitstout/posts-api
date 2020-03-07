const axios = require('axios');
const api = process.env.API;

const cache = {};

const options = {
    sortBy: {
        default: 'id',
        validInputs: ['id', 'reads', 'likes', 'popularity']
    },
    direction: {
        default: 'asc',
        validInputs: ['asc', 'desc'],
    }
};

const fetchPosts = async (tag) => {
    try {
        // naive cache implementation
        if (cache.hasOwnProperty(tag)) {
            return cache[tag];
        }
        const response = await axios(api+`?tag=${tag}`);
        cache[tag] = response.data.posts;
        return response.data.posts
    } catch(e) {
        console.log(e);
    }
}

const removeDuplicateResults = results => {
    const visitedPosts = {};
    const combinedPosts = [];
    results.forEach(result => {
        result.forEach(post => {
            if (!visitedPosts.hasOwnProperty(post.id)) {
                visitedPosts[post.id] = post.id;
                combinedPosts.push(post);
            }
        });
    });
    return combinedPosts;
}

const sortPosts = (data, parameter, direction) => {
    if (direction === options.direction.default) {
        return data.sort((a, b) => {
            return a[parameter] - b[parameter];
        });
    } else {
        return data.sort((a, b) => {
            return b[parameter] - a[parameter];
        });
    }
}

const isValidInput = (option, input) =>
    options[option].validInputs.includes(input);

const validateParameters = parameters => {
    const invalidParameters = [];
    Object.keys(parameters).forEach(parameter => {
        let valid = isValidInput(parameter, parameters[parameter]);
        if (!valid) {
            invalidParameters.push(parameter);
        }
    });
    const parametersAreValid = invalidParameters.length < 1;
    return [parametersAreValid, invalidParameters];
}

const get = async (req, res) => {
    const { query } = req;
    if (!query.hasOwnProperty('tag')) {
        res
            .status(400)
            .json({ error: 'Tags parameter is required'})
    } else {
        const { tag } = query;
        // remove any duplicate tags
        const tags = [...new Set(tag.split(','))];
        const sortBy = query['sortBy'] || options.sortBy.default;
        const direction = query['direction'] || options.direction.default;

        // check the inputs provided with sortBy and direction to make sure they are valid
        // if any invalid paramters are found we will display all of them in our error response
        const [parametersAreValid, invalidParameters] = validateParameters({ sortBy, direction });
        if (parametersAreValid) {
            const promises = [];
            tags.forEach(tag => {
                promises.push(fetchPosts(tag));
            });
            const results = await Promise.all(promises);
            const posts = removeDuplicateResults(results);
            res.status(200)
                .json(
                    sortPosts(posts, sortBy, direction)
                )
        } else {
            const errorMessage = invalidParameters.map(parameter => `${parameter} parameter is invalid.\n`);
            res.status(400).json({
                error: errorMessage
            })
        }
    }
}

const PostsController = (app, router) => {
    router.get('/', get);

    app.use('/posts', router);
};

module.exports = { PostsController, get };
