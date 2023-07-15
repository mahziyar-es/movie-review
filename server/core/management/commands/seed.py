from core.models import User, Review
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand, no_translations


class Command(BaseCommand):
    help = "Seeding the database"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

        self.create_admin()
        self.create_reviews()

        self.stdout.write(
            self.style.SUCCESS("Seeding done")
        )



    def create_admin(self):
        User.objects.all().delete()
        User.objects.create(
            email = 'admin@gmail.com',
            password = make_password('secretp@assw0rd'),
            is_staff = True,
        )

    def create_reviews(self):
        Review.objects.all().delete()
        # some movie trailers
        # DISCLAIMER: these videos do not belong to author of this website and these videsos are just for demo and non-commercial purposes
        base_data = [
            {
                "title": "Avatar 2 review",
                "video": "d9MyW72ELq0",
                "thumbnail": "core/static/avatar_t.jpg",
                "background_image": "core/static/avatar_bg.jpeg",
                "tags": "#avatar2#review",
                "seo_title": "avatar 2 movie review",
            },
            {
                "title": "The covenant review",
                "video": "02PPMPArNEQ",
                "thumbnail": "core/static/covenant_t.jpg",
                "background_image": "core/static/covenant_bg.jpg",
                "tags": "#covenant#review",
                "seo_title": "covenant movie review",
            },
            {
                "title": "John wick review",
                "video": "qEVUtrk8_B4",
                "thumbnail": "core/static/john_wick_t.jpg",
                "background_image": "core/static/john_wick_bg.jpg",
                "tags": "#john_wick#review",
                "seo_title": "john wick movie review",
            },
        ]

        for review in base_data:
            review['text'] = """DISCLAIMER :This is a DEMO website amd these videos do not belong to author of this website, videsos are just for demo and non-commercial purposes
            \n
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa tincidunt dui ut ornare lectus sit amet est. Felis eget velit aliquet sagittis id consectetur purus. Cursus in hac habitasse platea dictumst quisque sagittis. In ante metus dictum at tempor commodo ullamcorper a lacus. Curabitur gravida arcu ac tortor dignissim convallis. Tristique magna sit amet purus gravida quis blandit turpis cursus. Diam sit amet nisl suscipit adipiscing bibendum. Ut placerat orci nulla pellentesque dignissim enim sit amet venenatis. Non nisi est sit amet facilisis magna etiam. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Arcu felis bibendum ut tristique.
            Curabitur vitae nunc sed velit dignissim sodales ut. Id eu nisl nunc mi ipsum faucibus vitae. Pellentesque elit ullamcorper dignissim cras tincidunt. Posuere lorem ipsum dolor sit. Ut diam quam nulla porttitor massa. Auctor elit sed vulputate mi sit amet mauris commodo quis. Lectus magna fringilla urna porttitor rhoncus dolor. Adipiscing diam donec adipiscing tristique risus. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Porttitor leo a diam sollicitudin tempor id eu nisl. In iaculis nunc sed augue lacus viverra vitae congue eu. Viverra nam libero justo laoreet sit amet cursus sit. Nisl rhoncus mattis rhoncus urna neque. Et ligula ullamcorper malesuada proin. Nisl purus in mollis nunc sed id semper risus in.
            """

            Review.objects.create(**review)