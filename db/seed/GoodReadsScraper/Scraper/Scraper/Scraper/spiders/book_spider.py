"""Spider to extract information from a /book/show type page on Goodreads"""

import scrapy
# from dateutil.parser import parse as dateutil_parse
try:
    from dateutil.parser import parse as dateutil_parse
except:
    pass


class BookSpider(scrapy.Spider):
    """Extract information from a /book/show type page on Goodreads"""
    name = "book"

    def __init__(self):
        super().__init__()
        self.books_parsed = 0

    def report_progress_every_n(self, n):
        if self.books_parsed % n == 0:
            self.logger.info(
                "{} books parsed till now.".format(self.books_parsed))

    def parse(self, response):

        self.books_parsed += 1
        self.report_progress_every_n(50)

        book_details = {}

        book_details['list'] = "DevOps"
        book_details['url'] = response.request.url
        book_details['image']=response.xpath('//*[@id="coverImage"]/@src').extract()
        
        #book_rank = response.css("div#bookMeta") #uitext.stacked

        book_details['avg_ratings'] = response.xpath("//*[@id='bookMeta']/span[2]/text()").extract()
        book_details['num_reviews'] = response.xpath("//*[@id='bookMeta']/a[2]/text()").extract()

        #book_rank.css("span.average[itemprop=ratingValue]::text").extract_first()
#        book_details['num_reviews'] = response.css("span.count::text").extract_first().strip()
#        book_details['avg_ratings'] = float(response.css("span.average[itemprop=ratingValue]::text").extract_first().strip())
#                    
#        book_details['num_ratings'] = response.css("span.votes::text").extract_first().strip()
#        book_details['num_reviews'] = response.css("span.count::text").extract_first().strip()
#        book_details['avg_ratings'] = float(response.css("span.average[itemprop=ratingValue]::text").extract_first().strip())
        book_details['genres'] = response.css(
            "div.left>a[href*=genres]::text").extract()
        book_details['title'] = response.css(
            "#bookTitle::text").extract_first().strip()
        author = response.css('a.authorName>span::text').extract_first()
        if author:
            book_details['author'] = author.strip()

        num_pages = response.css(
            "span[itemprop=numberOfPages]::text").extract_first()
        if num_pages:
            book_details['num_pages'] = num_pages.strip().split()[0]

        book_data = response.css("div#bookDataBox")

        book_details['awards'] = book_data.css(".award::text").extract()
        book_details['places'] = book_data.css(
            "a[href*=places]::text").extract()
        book_details['character_names'] = book_data.css(
            'a[href*="characters"]::text').extract()
        book_details['language'] = book_data.css(
            "div[itemprop=inLanguage]::text").extract_first()

        if book_details['language']:
            book_details['language'].strip()

        feature_names = book_data.css("div.infoBoxRowTitle::text").extract()
        feature_values = book_data.css("div.infoBoxRowItem::text").extract()

        desired_names = set(["ISBN"])

        for name, value in zip(feature_names, feature_values):
            if name in desired_names:
                book_details[name.strip()] = value.strip()

        book_details['description']=response.xpath("//*[@id='description']/span[2]/text()").extract()
        #'div.quoteText a::text'
  #      book_descr = response.css("div.description")
   #     book_details['description']=book_descr.css(".readable stacked::text")
   #//*[@id="freeTextContainer13833339390620534313"]  //*[@id="description"]/a
        #.css(".readable.stacked::text").extract()

#       print(book_details)
        if book_details['language'] == "English":
            yield book_details
"""
        maybe_dates = response.css("div.row::text").extract()
        maybe_dates = [s for s in maybe_dates if "published" in s.lower()]

        published_dates = [dateutil_parse(
            date, fuzzy=True) for date in maybe_dates]

        if published_dates:
            book_details['publish_date'] = published_dates[0]
"""


    
