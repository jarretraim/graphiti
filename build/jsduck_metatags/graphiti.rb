 require "jsduck/meta_tag"

    class SinceTag < JsDuck::MetaTag
      def initialize
        # This defines the name of the @tag
        @name = "since"
        # Without this, tag contents will end at first newline
        @multiline = false
        
      end

    def to_value(contents)
      text = contents[0]
      if text =~ /\A([0-9.]+)(.*)\Z/
        {:version => $1, :text => $2.strip}
      else
        {:text => text || ""}
      end
    end

    def to_html(depr)
     <<-EOHTML
              <p class="pre">Since:<strong> #{depr[:version]}</strong></p>
        EOHTML
    end
    
    
    end
    